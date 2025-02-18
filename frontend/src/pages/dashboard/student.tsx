import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Company {
  id: string;
  name: string;
  description: string;
  location: string;
  isRemote: boolean;
  user: {
    firstName: string;
    lastName: string;
  };
}

const StudentDashboard = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/company', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch companies');
        }

        const data = await response.json();
        setCompanies(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching companies:', error);
        setError('Error loading companies');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="mb-8">
        <Link href="/settings" className="text-blue-600 hover:underline">Settings</Link>
      </div>

      <h2 className="text-2xl font-bold mb-4">Companies</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="space-y-4">
          {companies.map((company) => (
            <div key={company.id} className="border-b pb-4">
              <h3 className="font-bold">{company.name}</h3>
              <p>{company.description}</p>
              <p>
                {company.location} {company.isRemote && '(Remote Available)'}
              </p>
              <p>Contact: {company.user.firstName} {company.user.lastName}</p>
              <Link 
                href={`/company/view/${company.id}`}
                className="text-blue-600 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;