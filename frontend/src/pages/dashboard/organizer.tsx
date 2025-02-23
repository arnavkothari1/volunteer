"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import '@/styles/organizer-dashboard.css';
import ErrorBoundary from '@/components/ErrorBoundary';

interface CompanyInfo {
  name: string;
  description: string;
  location: string;
  industry: string;
  mission: string;
  benefits: string;
  position: string;
}

interface Internship {
  id: string;
  title: string;
  description: string;
  requirements: string;
  status: string;
  applications: Application[];
  company: {
    name: string;
  };
}

interface Application {
  id: string;
  status: string;
  fullName: string;
  email: string;
  skills: string;
  coverLetter: string;
  aadharCard: string;
  tenthMarksheet: string;
  student: {
    firstName: string;
    lastName: string;
    email: string;
  };
  internship: {
    title: string;
    company: {
      name: string;
    };
  };
}

export default function OrganizerDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<CompanyInfo | null>(null);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  const fetchInternships = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/internships/company', {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setInternships(data);
      }
    } catch (error) {
      console.error('Failed to fetch internships:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch company data
        const companyRes = await fetch('http://localhost:5000/api/company/current', {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (companyRes.status === 404) {
          router.push('/company/create');
          return;
        }

        if (!companyRes.ok) {
          throw new Error('Failed to fetch company');
        }

        const companyData = await companyRes.json();
        setCompany(companyData);

        // Fetch internships
        await fetchInternships();

        // Fetch applications
        await fetchApplications();
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    fetchData();
  }, [router]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      const res = await fetch('http://localhost:5000/api/applications', {
        headers: {
          'Authorization': token
        }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch applications');
      }

      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/applications/${applicationId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) {
        console.error('Status update failed:', await res.text());
        throw new Error('Failed to update status');
      }

      const updatedApplication = await res.json();
      console.log('Updated application:', updatedApplication);
      // Update the local state with the new status
      setApplications(prevApplications => 
        prevApplications.map(app => 
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleNavigation = (path: string) => {
    console.log('Attempting navigation to:', path);
    if (!path) {
      console.error('Invalid path:', path);
      return;
    }
    router.push(path);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!company) {
    return <div className="flex items-center justify-center min-h-screen">No company found</div>;
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
            <div className="section-header">
              <h2 className="text-xl font-bold">Posted Internships</h2>
              <button 
                onClick={() => router.push('/internships/create')}
                className="create-button"
              >
                Create Internship
              </button>
            </div>

            {internships?.map((internship) => (
              <div key={internship.id} className="internship-card">
                <div className="internship-info">
                  <h3 className="internship-title">{internship.title}</h3>
                  <p className="internship-company">{internship.company?.name}</p>
                  <p className="internship-description">{internship.description}</p>
                </div>
                  <button 
                    onClick={() => {
                      console.log('View Applications clicked for internship:', internship.id);
                      handleNavigation(`/internships/${internship.id}/applications`);
                    }}
                    className="action-button view"
                  >
                    View Applications
                  </button>
              </div>
            ))}
          </div>

          {applications.length > 0 && (
            <div className="applications-section">
              <h2 className="text-xl font-bold mb-4">Recent Applications</h2>
              {applications.map((application) => (
                <div key={application.id} className="application-card">
                  <div className="applicant-info">
                    <h3>{application.fullName}</h3>
                    <p>{application.email}</p>
                    <p>Applied for: {application.internship.title}</p>
                  </div>
                  <div className="application-status">
                    <select
                      value={application.status}
                      onChange={(e) => handleStatusChange(application.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="ACCEPTED">Accept</option>
                      <option value="REJECTED">Reject</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}