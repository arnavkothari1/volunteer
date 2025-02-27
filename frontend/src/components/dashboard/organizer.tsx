"use client"

import { useEffect, useState } from 'react';
import { useRouter } from '../../hooks/useRouter';
import { toast } from '../ui/use-toast';
import '../../styles/organizer-dashboard.css';
import ErrorBoundary from '../ErrorBoundary'; 

interface Company {
  id: string;
  name: string;
  description: string;
  location: string;
  industry: string;
  mission: string;
  benefits: string;
}

interface Application {
  id: string;
  fullName: string;
  email: string;
  status: string;
  createdAt: string;
}

interface Internship {
  id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  isRemote: boolean;
  requirements: string[];
  applications: Application[];
}

export default function OrganizerDashboard() {
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanyData();
    fetchInternships();
  }, []);

  const fetchCompanyData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/company/current', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setCompany(data.company);
      } else {
        toast.error(data.message || "Failed to load company data");
      }
    } catch (error) {
      toast.error("Failed to load company data");
    } finally {
      setLoading(false);
    }
  };

  const fetchInternships = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/internships/company', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!res.ok) {
        throw new Error('Failed to fetch internships');
      }
      
      const data = await res.json();
      console.log('Internships data:', data); // Debug log
      if (data.success) {
        setInternships(data.internships);
      } else {
        toast.error(data.message || "Failed to load internships");
      }
    } catch (error) {
      console.error('Error fetching internships:', error);
      toast.error("Failed to load internships");
    }
  };

  const handleCreateInternship = () => {
    router.push('/internships/create');
  };

  const handleViewApplications = (id: string) => {
    router.push(`/internships/${id}/applications`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <ErrorBoundary>
      <div className="organizer-dashboard">
        {company && (
          <div className="company-profile">
            <div className="company-header">
              <h1>{company.name}</h1>
              <p className="company-location">{company.location} • {company.industry}</p>
            </div>
            <div className="company-details">
              <div className="detail-section">
                <h3>About Us</h3>
                <p>{company.description}</p>
              </div>
              <div className="detail-section">
                <h3>Our Mission</h3>
                <p>{company.mission}</p>
              </div>
              <div className="detail-section">
                <h3>Benefits</h3>
                <p>{company.benefits}</p>
              </div>
            </div>
          </div>
        )}

        <div className="internships-section">
          <div className="section-header">
            <h2>Your Internships</h2>
            <button 
              className="create-internship-btn"
              onClick={() => router.push('/internships/create')}
            >
              Create New Internship
            </button>
          </div>

          {internships.length === 0 ? (
            <div className="no-internships">
              <p>No internships posted yet. Create your first internship!</p>
            </div>
          ) : (
            <div className="internships-grid">
              {internships.map((internship) => (
                <div key={internship.id} className="internship-card">
                  <div className="card-header">
                    <h3>{internship.title}</h3>
                    <span className={`status-badge ${internship.status.toLowerCase()}`}>
                      {internship.status}
                    </span>
                  </div>
                  
                  <div className="card-meta">
                    <span className="location">
                      <i className="fas fa-map-marker-alt"></i> {internship.location}
                    </span>
                    {internship.isRemote && (
                      <span className="remote-badge">
                        <i className="fas fa-laptop-house"></i> Remote
                      </span>
                    )}
                  </div>

                  <p className="description">{internship.description.substring(0, 150)}...</p>
                  
                  <div className="requirements-section">
                    <h4>Requirements:</h4>
                    <ul>
                      {internship.requirements.slice(0, 3).map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                      {internship.requirements.length > 3 && (
                        <li className="more">+{internship.requirements.length - 3} more</li>
                      )}
                    </ul>
                  </div>

                  <div className="card-footer">
                    <div className="applications-count">
                      <i className="fas fa-users"></i>
                      <span>{internship.applications.length} Applications</span>
                    </div>
                    <button 
                      className="view-btn"
                      onClick={() => router.push(`/internships/${internship.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {internships.length > 0 && internships.some(internship => internship.applications.length > 0) ? (
          <>
            <div className="all-applications-section">
              <h2>All Applications</h2>
              <div className="applications-table">
                <table>
                  <thead>
                    <tr>
                      <th>Applicant</th>
                      <th>Position</th>
                      <th>Date Applied</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {internships.flatMap(internship => 
                      internship.applications.map(app => (
                        <tr key={app.id}>
                          <td>{app.fullName}</td>
                          <td>{internship.title}</td>
                          <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                          <td>
                            <select 
                              value={app.status}
                              onChange={async (e) => {
                                try {
                                  const token = localStorage.getItem('token');
                                  const res = await fetch(`http://localhost:5000/api/application/${app.id}/status`, {
                                    method: 'PATCH',
                                    headers: {
                                      'Authorization': `Bearer ${token}`,
                                      'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ status: e.target.value })
                                  });
                                  if (res.ok) {
                                    toast.success('Status updated successfully');
                                    fetchInternships(); // Refresh the data
                                  } else {
                                    toast.error('Failed to update status');
                                  }
                                } catch (error) {
                                  toast.error('Failed to update status');
                                }
                              }}
                            >
                              <option value="PENDING">Pending</option>
                              <option value="ACCEPTED">Accepted</option>
                              <option value="REJECTED">Rejected</option>
                            </select>
                          </td>
                          <td>
                            <button 
                              className="view-application-btn"
                              onClick={() => {
                                // Open a modal or navigate to application details
                                router.push(`/applications/${app.id}`);
                              }}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="applications-section">
              <h2>Recent Applications</h2>
              <div className="applications-table">
                <table>
                  <thead>
                    <tr>
                      <th>Applicant</th>
                      <th>Position</th>
                      <th>Date Applied</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {internships.flatMap(internship => 
                      internship.applications.map(app => (
                        <tr key={app.id}>
                          <td>{app.fullName}</td>
                          <td>{internship.title}</td>
                          <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                          <td>
                            <span className={`status ${app.status.toLowerCase()}`}>
                              {app.status}
                            </span>
                          </td>
                          <td>
                            <button onClick={() => router.push(`/applications/${app.id}`)}>
                              Review
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="no-applications">
            <h2>No Applications Yet</h2>
            <p>Once you receive applications for your internships, they will appear here.</p>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}