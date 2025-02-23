import '@/styles/forms.css';
import { Layout } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useRouter } from "next/router";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, MapPin, Clock } from "lucide-react";

export default function CreateInternship() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    type: "FULL_TIME",
    requirements: "",
    status: "OPEN"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/internships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          requirements: formData.requirements.split('\n').filter(req => req.trim() !== '')
        })
      });
      if (res.ok) {
        router.push('/dashboard/organizer');
      }
    } catch (error) {
      console.error('Error creating internship:', error);
    }
  };

  return (
    <Layout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Create New Internship</h2>
            <p className="text-muted-foreground">
              Post a new internship opportunity for students
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Position Title</Label>
              <div className="relative">
                <Briefcase className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-8"
                  placeholder="e.g., Software Engineering Intern"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-8"
                    placeholder="City, State or Remote"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Type</Label>
                <div className="relative">
                  <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({...formData, type: value})}
                  >
                    <SelectTrigger className="pl-8">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FULL_TIME">Full Time</SelectItem>
                      <SelectItem value="PART_TIME">Part Time</SelectItem>
                      <SelectItem value="FLEXIBLE">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                className="min-h-[150px]"
                placeholder="Describe the internship role, responsibilities, and what interns will learn..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label>Requirements (one per line)</Label>
              <Textarea
                className="min-h-[150px]"
                placeholder="- Minimum GPA of 3.0&#10;- Programming experience in Python&#10;- Strong communication skills"
                value={formData.requirements}
                onChange={(e) => setFormData({...formData, requirements: e.target.value})}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Create Internship
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </Layout>
  );
} 