"use client"

import '@/styles/forms.css';
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Building2, MapPin, Briefcase } from "lucide-react"

interface InternshipDetails {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  company: {
    name: string;
    location: string;
    industry: string;
  };
}

export default function ApplicationForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [internship, setInternship] = useState<InternshipDetails | null>(null);
  
  // Updated form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    skills: "",
    coverLetter: "",
    aadharCard: null as File | null,
    tenthMarksheet: null as File | null,
  });

  useEffect(() => {
    const fetchInternship = async () => {
      if (!id) return;
      try {
        const res = await fetch(`http://localhost:5000/api/internships/${id}`, {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setInternship(data);
        }
      } catch (error) {
        console.error('Failed to fetch internship:', error);
      }
    };

    fetchInternship();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload both documents
      const uploadFile = async (file: File, type: string) => {
        const formDataUpload = new FormData();
        formDataUpload.append(type, file);
        
        const uploadRes = await fetch(`http://localhost:5000/api/upload/${type}`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formDataUpload
        });

        if (!uploadRes.ok) {
          throw new Error(`Failed to upload ${type}`);
        }

        const uploadData = await uploadRes.json();
        return uploadData.url;
      };

      const [aadharUrl, marksheetUrl] = await Promise.all([
        formData.aadharCard ? uploadFile(formData.aadharCard, 'aadhar') : '',
        formData.tenthMarksheet ? uploadFile(formData.tenthMarksheet, 'marksheet') : ''
      ]);

      // Submit the application with all fields
      const res = await fetch(`http://localhost:5000/api/internships/${id}/apply`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          skills: formData.skills.split(',').map(skill => skill.trim()),
          coverLetter: formData.coverLetter,
          aadharCard: aadharUrl,
          tenthMarksheet: marksheetUrl,
        })
      });

      if (res.ok) {
        toast({
          title: "Success!",
          description: "Your application has been submitted successfully."
        });
        router.push('/dashboard/student?applied=true');
      } else {
        throw new Error('Failed to submit application');
      }
    } catch (error) {
      console.error('Application submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!internship) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Apply to {internship.title}</CardTitle>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Building2 className="h-4 w-4" />
              <span>{internship.company.name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{internship.company.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Briefcase className="h-4 w-4" />
              <span>{internship.company.industry}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    fullName: e.target.value
                  }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    email: e.target.value
                  }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Skills (comma-separated)</label>
                <Input
                  value={formData.skills}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    skills: e.target.value
                  }))}
                  placeholder="e.g., JavaScript, React, Node.js"
                  required
                />
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium mb-2">Why do you want to join us?</label>
              <Textarea
                value={formData.coverLetter}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  coverLetter: e.target.value
                }))}
                className="min-h-[200px]"
                required
              />
            </div>

            {/* Document Uploads */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Aadhar Card
                </label>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    aadharCard: e.target.files?.[0] || null
                  }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  10th Marksheet
                </label>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    tenthMarksheet: e.target.files?.[0] || null
                  }))}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={loading || !formData.fullName || !formData.email || !formData.skills || 
                       !formData.coverLetter || !formData.aadharCard || !formData.tenthMarksheet}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 
