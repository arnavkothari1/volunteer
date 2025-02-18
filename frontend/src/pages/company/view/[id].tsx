import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/CompanyView.module.css';

interface Company {
  id: string;
  name: string;
  description: string;
  location: string;
  isRemote: boolean;
  occupiedPositions: string[];
  interests: string[];
  internships: Array<{
    id: string;
    title: string;
    description: string;
    status: string;
  }>;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface Internship {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  skills: string[];
  workLocation: string;
  isRemote: boolean;
  status: string;
  company: {
    id: string;
    name: string;
    location: string;
    user: {
      firstName: string;
      lastName: string;
    };
  };
}

const CompanyViewPage = () => {
  const [company, setCompany] = useState<Company | null>(null);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [application, setApplication] = useState<any>(null);
  const router = useRouter();
  const { id } = router.query;
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        // Fetch company details
        const companyResponse = await fetch(`http://localhost:5000/api/company/${id}`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (companyResponse.ok) {
          const companyData = await companyResponse.json();
          setCompany(companyData);
        }

        // Fetch company's internships
        const internshipsResponse = await fetch(`http://localhost:5000/api/internship/company/${id}`);
        if (internshipsResponse.ok) {
          const internshipsData = await internshipsResponse.json();
          setInternships(internshipsData);
        }

        // Fetch user's application for this company
        const applicationRes = await fetch(`http://localhost:5000/api/applications/user/${id}`, {
          credentials: 'include'
        });
        if (applicationRes.ok) {
          const appData = await applicationRes.json();
          setApplication(appData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load company');
      } finally {
        setLoading(false);
      }
    };

    // Fetch current user data
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (id) {
      fetchData();
      fetchUser();
    }
  }, [id]);

  const handleApply = async () => {
    // Get the internship ID from the company data
    if (!company?.internships?.[0]?.id) {
      setError('No internship available');
      return;
    }

    // Redirect to the application form
    router.push(`/internship/${company.internships[0].id}/apply`);
  };

  const renderInternship = (internship: any) => (
    <div key={internship.id} className="mb-8 p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold mb-2">{internship.title}</h3>
        {internship.status === 'OPEN' && (
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            OPEN
          </span>
        )}
      </div>
      <p className="mb-4">{internship.description}</p>
      
      {/* Application Status Section */}
      {internship.application && (
        <div className={`mt-4 p-4 rounded-lg ${
          internship.application.status === 'ACCEPTED' 
            ? 'bg-green-50 border border-green-200' 
            : internship.application.status === 'REJECTED'
            ? 'bg-red-50 border border-red-200'
            : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <div className="flex items-center space-x-2">
            {internship.application.status === 'ACCEPTED' && (
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            )}
            <span className={`font-medium ${
              internship.application.status === 'ACCEPTED' ? 'text-green-800' :
              internship.application.status === 'REJECTED' ? 'text-red-800' :
              'text-yellow-800'
            }`}>
              Application {internship.application.status}
            </span>
            {internship.application.statusMessage && (
              <span className="text-gray-600">- {internship.application.statusMessage}</span>
            )}
          </div>
        </div>
      )}

      {/* Requirements and Skills sections */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2">Requirements:</h4>
          <ul className="list-disc pl-4">
            {internship.requirements.map((req: string, index: number) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Skills:</h4>
          <ul className="list-disc pl-4">
            {internship.skills.map((skill: string, index: number) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Apply button - only show if no application exists */}
      {!internship.application && (
        <button
          onClick={() => router.push(`/applications/create/${internship.id}`)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Apply Now
        </button>
      )}
    </div>
  );

  if (loading) return <div>Loading...</div>;
  if (!company) return <div>Company not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{company.name}</h1>
        
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p>{company.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Location</h2>
            <p>{company.location} {company.isRemote && '(Remote Available)'}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Available Positions</h2>
            <ul className="list-disc pl-5">
              {company.occupiedPositions.map((position, index) => (
                <li key={index}>{position}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Company Interests</h2>
            <ul className="list-disc pl-5">
              {company.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <button
            onClick={handleApply}
            disabled={applying}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {applying ? 'Submitting...' : 'Apply Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyViewPage; 