import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/styles/Organizer.module.css';
import { fetchWithAuth } from '@/utils/api';

interface CreateCompanyForm {
  name: string;
  description: string;
  yourPosition: string;
  location: string;
  interests: string[];
  isRemote: boolean;
  occupiedPositions: string[];
}

const OrganizerDashboard = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [newPosition, setNewPosition] = useState('');
  const [formData, setFormData] = useState<CreateCompanyForm>({
    name: '',
    description: '',
    yourPosition: '',
    location: '',
    interests: [],
    isRemote: false,
    occupiedPositions: []
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<any>(null);

  const handlePositionAdd = () => {
    if (newPosition.trim()) {
      setFormData(prev => ({
        ...prev,
        occupiedPositions: [...prev.occupiedPositions, newPosition.trim()]
      }));
      setNewPosition('');
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        router.push('/auth/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          userPosition: formData.yourPosition,
          location: formData.location,
          interests: formData.interests,
          isRemote: formData.isRemote,
          occupiedPositions: formData.occupiedPositions.length > 0 ? formData.occupiedPositions : []
        })
      });

      if (response.ok) {
        const company = await response.json();
        router.push(`/company/manage/${company.id}`);
      } else {
        const errorData = await response.json();
        console.error('Failed to create company:', errorData);
        if (response.status === 401) {
          localStorage.removeItem('token');
          router.push('/auth/login');
        }
      }
    } catch (error) {
      console.error('Error creating company:', error);
    }
  };

  const getCompany = async () => {
    try {
      const data = await fetchWithAuth('http://localhost:5000/api/company/current');
      setProfile(data);
    } catch (error) {
      console.error('Failed to fetch company:', error);
    }
  };

  useEffect(() => {
    const checkCompany = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/company/current', {
          credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
          // If company exists, redirect to manage page
          router.push(`/company/manage/${data.id}`);
        } else if (response.status === 404) {
          // If no company found, redirect to create page
          router.push('/company/create');
        }
      } catch (error) {
        console.error('Error checking company:', error);
      }
    };

    checkCompany();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Loading...</p>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Error: {error}</p>
      <p>Redirecting to login...</p>
    </div>
  );

  if (!company) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1>Welcome Organizer!</h1>
        <p>You haven&apos;t created a company yet.</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => router.push('/company/create')}
        >
          Create Company
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Organizer Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold">{company.name}</h2>
        <p className="mt-2">Location: {company.location}</p>
        <p>Organizer: {company.user?.firstName} {company.user?.lastName}</p>
      </div>
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => router.push(`/company/manage/${company.id}`)}
      >
        Manage Company
      </button>
    </div>
  );
};

export default OrganizerDashboard; 