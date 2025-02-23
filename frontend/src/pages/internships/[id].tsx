"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, MapPin, Briefcase } from "lucide-react"

interface Internship {
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

export default function InternshipDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);

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
        console.error('Failed to load internship:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInternship();
    }
  }, [id]);

  const handleApply = () => {
    if (id) {
      router.push(`/internships/${id}/apply`);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!internship) {
    return <div className="flex items-center justify-center min-h-screen">Internship not found</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{internship.title}</CardTitle>
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
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{internship.description}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Requirements</h3>
            <ul className="list-disc list-inside text-gray-600">
              {internship.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
          <div className="pt-4">
            <Button 
              onClick={handleApply}
              className="w-full bg-primary text-white"
            >
              Apply Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 