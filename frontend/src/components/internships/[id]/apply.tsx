"use client"

import '@/styles/forms.css';
import { useState, useEffect } from "react"
import { useRouter } from "../../../hooks/useRouter"
import { Button } from "../../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Input } from "../../ui/input"
import { Textarea } from "../../ui/textarea"
import { useToast } from "../../ui/use-toast"
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

interface ApplicationForm {
  skills: string[];
  coverLetter: string;
  aadharCard: File | null;
  tenthMarksheet: File | null;
}

export default function ApplyInternship() {
  const router = useRouter();
  const { toast } = useToast();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [internship, setInternship] = useState<InternshipDetails | null>(null);
  
  const [formData, setFormData] = useState<ApplicationForm>({
    skills: [],
    coverLetter: '',
    aadharCard: null,
    tenthMarksheet: null
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
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      formDataToSend.append('skills', JSON.stringify(formData.skills));
      formDataToSend.append('coverLetter', formData.coverLetter);
      if (formData.aadharCard) formDataToSend.append('aadharCard', formData.aadharCard);
      if (formData.tenthMarksheet) formDataToSend.append('tenthMarksheet', formData.tenthMarksheet);

      const res = await fetch(`http://localhost:5000/api/internships/${id}/apply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await res.json();

      if (data.success) {
        toast({
          title: "Application submitted successfully!",
          description: "You can now check your applications in the dashboard."
        });
        router.push('/dashboard/student');
      } else {
        toast({
          title: "Failed to submit application",
          description: data.message || "An unexpected error occurred"
        });
      }
    } catch (error) {
      toast({
        title: "Error submitting application",
        description: "An unexpected error occurred"
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
                <label className="block text-sm font-medium mb-2">Skills (comma-separated)</label>
                <Input
                  value={formData.skills.join(',')}
                  onChange={(e) => setFormData({
                    ...formData,
                    skills: e.target.value.split(',').map(s => s.trim())
                  })}
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
                onChange={(e) => setFormData({
                  ...formData,
                  coverLetter: e.target.value
                })}
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
                  onChange={(e) => {
                    // Handle file upload
                  }}
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
                  onChange={(e) => {
                    // Handle file upload
                  }}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={loading || !formData.skills.length || !formData.coverLetter}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 
