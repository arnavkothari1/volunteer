import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/student-applications.css';

interface Application {
  id: string;
  status: string;
  createdAt: string;
  internship: {
    id: string;
    title: string;
    company: {
      name: string;
      industry: string;
    };
  };
}

export default function StudentApplicationList() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/application/student/applications', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }

      const data = await response.json();
      if (data.success) {
        setApplications(data.applications);
      } else {
        throw new Error(data.message || 'Failed to fetch applications');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return 'status-pending';
      case 'ACCEPTED':
        return 'status-accepted';
      case 'REJECTED':
        return 'status-rejected';
      default:
        return '';
    }
  };

  if (loading) return <div className="loading">Loading applications...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section className="student-applications-section">
      <h2>Applications Sent</h2>
      {applications.length === 0 ? (
        <p className="no-applications">You haven't submitted any applications yet.</p>
      ) : (
        <div className="applications-grid">
          {applications.map((application) => (
            <div key={application.id} className="application-card">
              <div className="application-header">
                <h3>{application.internship.title}</h3>
              </div>
              <div className="company-info">
                <p className="company-name">{application.internship.company.name}</p>
                <p className="industry">{application.internship.company.industry}</p>
              </div>
              <div className="application-meta">
                <span className="date">
                  Applied on: {new Date(application.createdAt).toLocaleDateString()}
                </span>
                <span className={`status-badge ${getStatusColor(application.status)}`}>
                  {application.status}
                </span>
              </div>
              <div className="application-footer">
                <button
                  onClick={() => navigate(`/applications/${application.id}`)}
                  className="view-details-btn"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
} 