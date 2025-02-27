import '../../../styles/internship-details.css';
import { useEffect, useState } from 'react';
import { useRouter } from '../../../hooks/useRouter';
import ErrorBoundary from '../../ErrorBoundary';
import { toast } from "../../ui/use-toast";

interface InternshipDetail {
  id: string;
  title: string;
  description: string;
  location: string;
  isRemote: boolean;
  requirements: string[];
  company: {
    name: string;
    industry: string;
  };
}

export default function InternshipDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [internship, setInternship] = useState<InternshipDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/internships/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setInternship(data.internship);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error("Failed to load internship details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchInternship();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!internship) return <div>Internship not found</div>;

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{internship.title}</h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">{internship.company.name}</h2>
            <p className="text-gray-600">{internship.company.industry} • {internship.isRemote ? "Remote" : internship.location}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="whitespace-pre-wrap">{internship.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Requirements</h3>
            <ul>
              {internship.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => router.push(`/internships/${id}/apply`)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply Now
          </button>
        </div>
      </div>
    </ErrorBoundary>
  );
} 