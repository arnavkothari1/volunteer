import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/lib/toast";

interface InternshipFormData {
  title: string;
  description: string;
  location: string;
  type: string;
  requirements: string;
  status: string;
}

export default function EditInternship() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<InternshipFormData>({
    title: "",
    description: "",
    location: "",
    type: "",
    requirements: "",
    status: ""
  });

  useEffect(() => {
    if (id) {
      fetch(`/api/internships/${id}`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          setFormData({
            ...data,
            requirements: data.requirements.join('\n')
          });
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching internship:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/internships/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          requirements: formData.requirements.split('\n').filter(req => req.trim() !== '')
        })
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: "Internship updated successfully",
        });
        router.push(`/internships/${id}`);
      }
    } catch (error) {
      console.error('Error updating internship:', error);
      toast({
        title: "Error",
        description: "Failed to update internship",
        variant: "destructive",
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Edit Internship</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Position Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({...formData, type: value})}
                >
                  <SelectTrigger>
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

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                className="min-h-[150px]"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label>Requirements (one per line)</Label>
              <Textarea
                className="min-h-[150px]"
                value={formData.requirements}
                onChange={(e) => setFormData({...formData, requirements: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({...formData, status: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OPEN">Open</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </Layout>
  );
} 