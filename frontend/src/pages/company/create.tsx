"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Mail, MapPin, Briefcase, Users, Lightbulb, Gift } from "lucide-react";
import '@/styles/forms.css';

export default function CreateCompany() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    email: "",
    industry: "",
    mission: "",
    benefits: "",
    position: "",
    occupiedPositions: 0
  });

  useEffect(() => {
    // Check if user already has a company
    const checkCompany = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/company/profile', {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });

        if (res.ok) {
          // If company exists, redirect to dashboard
          router.push('/dashboard/organizer');
        }
      } catch (error) {
        console.error('Error checking company:', error);
      }
    };

    checkCompany();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/company/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error('Failed to create company');
      }

      router.push('/dashboard/organizer');
    } catch (error) {
      console.error('Create company error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Your Company Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Company Name</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="pl-10"
              placeholder="Enter company name"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-10"
              placeholder="Enter company email"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="pl-10"
              placeholder="Enter company location"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Industry</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              className="pl-10"
              placeholder="Enter company industry"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Your Position</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="pl-10"
              placeholder="Enter your position in the company"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Occupied Positions</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              value={formData.occupiedPositions}
              onChange={(e) => setFormData({ ...formData, occupiedPositions: parseInt(e.target.value) || 0 })}
              className="pl-10"
              type="number"
              min="0"
              placeholder="Number of occupied positions"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Company Mission</label>
          <div className="relative">
            <Lightbulb className="absolute left-3 top-3 text-gray-400" />
            <Textarea
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              className="pl-10 min-h-[100px]"
              placeholder="Enter company mission"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Benefits</label>
          <div className="relative">
            <Gift className="absolute left-3 top-3 text-gray-400" />
            <Textarea
              value={formData.benefits}
              onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              className="pl-10 min-h-[100px]"
              placeholder="Enter company benefits"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Company Description</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter company description"
            className="min-h-[100px]"
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Company Profile"}
        </Button>
      </form>
    </div>
  );
} 