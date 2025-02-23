import '@/styles/internship-details.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ErrorBoundary from '@/components/ErrorBoundary';

interface Internship {
  id: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  duration: string;
  stipend: string;
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

  useEffect(() => {
    if (!router.isReady) return;
    
    if (!id) {
      console.error('No internship ID found');
      router.push('/internships');
      return;
    }

    console.log('Current internship ID:', id);
    const fetchInternship = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/internships/${id}`, {
          headers: {
            'Authorization': token || ''
          }
        });

        if (!res.ok) throw new Error('Failed to fetch internship details');

        const data = await res.json();
        setInternship(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchInternship();
  }, [router.isReady, id, router]);

  const handleApply = async () => {
    if (!router.isReady) return;
    const internshipId = router.query.id;
    if (typeof internshipId !== 'string') {
      console.error('Invalid internship ID');
      return;
    }
    const applyPath = `/internships/${internshipId}/apply`;
    await router.push(applyPath);
  };

  if (!internship) return <div>Loading...</div>;

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{internship.title}</h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">{internship.company.name}</h2>
            <p className="text-gray-600">{internship.company.location} • {internship.company.industry}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold">Duration</h3>
              <p>{internship.duration}</p>
            </div>
            <div>
              <h3 className="font-semibold">Stipend</h3>
              <p>{internship.stipend}</p>
            </div>
            <div>
              <h3 className="font-semibold">Location</h3>
              <p>{internship.location}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="whitespace-pre-wrap">{internship.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Requirements</h3>
            <p className="whitespace-pre-wrap">{internship.requirements}</p>
          </div>

          <button
            onClick={handleApply}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply Now
          </button>
        </div>
      </div>
    </ErrorBoundary>
  );
} 