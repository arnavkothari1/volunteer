"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { toast } from "@/components/ui/use-toast"
import '@/styles/dashboard.css'
import ErrorBoundary from '@/components/ErrorBoundary'

interface Application {
  id: string;
  status: string;
  internship: {
    title: string;
    company: {
      name: string;
    };
  };
}

interface Internship {
  id: string;
  title: string;
  company: {
    name: string;
  };
}

export default function StudentDashboard() {
  const router = useRouter();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/auth/login');
          return;
        }

        const [internshipsRes, applicationsRes] = await Promise.all([
          fetch('http://localhost:5000/api/internships', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('http://localhost:5000/api/applications', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        if (!internshipsRes.ok || !applicationsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [internshipsData, applicationsData] = await Promise.all([
          internshipsRes.json(),
          applicationsRes.json()
        ]);

        setInternships(internshipsData);
        setApplications(applicationsData);

        // Show success toast if there's a new application
        if (router.query.applied === 'true') {
          toast({
            title: "Success",
            description: "Your application has been submitted successfully!"
          });
          // Remove the query parameter
          router.replace('/dashboard/student', undefined, { shallow: true });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleViewDetails = async (internshipId: string) => {
    if (!internshipId) {
      console.error('Invalid internship ID');
      return;
    }
    const detailsPath = `/internships/${internshipId}`;
    await router.push(detailsPath);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <ErrorBoundary>
      <div className="dashboard-container">
        <aside className="sidebar">
          <div className="logo">StudentVolunteer</div>
          <nav>
            <a href="#" className="nav-item active">Dashboard</a>
            <a href="#" className="nav-item">My Applications</a>
            <a href="#" className="nav-item">Saved Listings</a>
            <a href="#" className="nav-item">Settings</a>
          </nav>
        </aside>

        <main className="main-content">
          <div className="welcome-section">
            <h1 className="text-2xl font-bold">Welcome back!</h1>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>Applications</h3>
              <p className="coming-soon">Coming Soon</p>
            </div>
            <div className="stat-card">
              <h3>Internships</h3>
              <p className="coming-soon">Coming Soon</p>
            </div>
            <div className="stat-card">
              <h3>Messages</h3>
              <p className="coming-soon">Coming Soon</p>
            </div>
          </div>

          <div className="internships-section">
            <h2 className="text-xl font-bold mb-4">Available Internships</h2>
            {internships?.map((internship) => (
              <div key={internship.id} className="internship-card">
                <h3 className="internship-title">{internship.title}</h3>
                <p className="internship-company">{internship.company?.name}</p>
                <button
                  onClick={() => handleViewDetails(internship.id)}
                  className="view-button"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          {applications && applications.length > 0 && (
            <div className="internships-section mt-6">
              <h2 className="text-xl font-bold mb-4">Your Applications</h2>
              {applications.map((application) => (
                <div key={application.id} className="internship-card">
                  <h3 className="internship-title">{application.internship?.title}</h3>
                  <p className="internship-company">{application.internship?.company?.name}</p>
                  <p className={`status-badge ${application.status?.toLowerCase() || 'pending'}`}>
                    Status: {application.status?.toLowerCase() || 'pending'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}