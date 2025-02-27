import { useEffect, useState } from 'react';
import { useRouter } from '../../hooks/useRouter';
import { toast } from '../ui/use-toast';
import '../../styles/applications.css';

interface Application {
  id: string;
  fullName: string;
  email: string;
  status: string;
  createdAt: string;
  skills: string[];
  coverLetter: string;
  aadharCard: string;
  tenthMarksheet: string;
}

interface Internship {
  id: string;
  title: string;
  company: {
    name: string;
  };
}

export default function ApplicationsList() {
  const router = useRouter();
  const { id } = router.query;
  const [applications, setApplications] = useState<Application[]>([]);
  const [internship, setInternship] = useState<Internship | null>(null);

  useEffect(() => {
    if (id) {
      fetchInternshipDetails();
      fetchApplications();
    }
  }, [id]);

  const fetchInternshipDetails = async () => {
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
      toast.error("Failed to load internship details");
    }
  };

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/application/internship/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setApplications(data.applications);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error("Failed to load applications");
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/application/${applicationId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        toast.success(`Application ${status.toLowerCase()}`);
        fetchApplications(); // Refresh the list
      } else {
        toast.error("Failed to update application status");
      }
    } catch (error) {
      toast.error("Failed to update application status");
    }
  };

  return (
    <div className="applications-page">
      <div className="page-header">
        <button onClick={() => router.push('/dashboard/organizer')} className="back-button">
          ← Back
        </button>
        <h1>Applications for {internship?.title}</h1>
        <p className="company-name">{internship?.company.name}</p>
      </div>

      {applications.length === 0 ? (
        <div className="no-applications">
          <p>No applications received yet.</p>
        </div>
      ) : (
        <div className="applications-list">
          {applications.map((application) => (
            <div key={application.id} className="application-card">
              <div className="applicant-info">
                <h3>{application.fullName}</h3>
                <p>{application.email}</p>
                <p className="date">Applied on {new Date(application.createdAt).toLocaleDateString()}</p>
                <div className="skills">
                  <h4>Skills:</h4>
                  <div className="skill-tags">
                    {application.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="application-documents">
                {application.coverLetter && (
                  <a href={application.coverLetter} target="_blank" rel="noopener noreferrer" className="document-link">
                    Cover Letter
                  </a>
                )}
                {application.aadharCard && (
                  <a href={application.aadharCard} target="_blank" rel="noopener noreferrer" className="document-link">
                    Aadhar Card
                  </a>
                )}
                {application.tenthMarksheet && (
                  <a href={application.tenthMarksheet} target="_blank" rel="noopener noreferrer" className="document-link">
                    10th Marksheet
                  </a>
                )}
              </div>

              <div className="application-status">
                {application.status === 'PENDING' ? (
                  <div className="action-buttons">
                    <button
                      onClick={() => updateApplicationStatus(application.id, 'ACCEPTED')}
                      className="accept-btn"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(application.id, 'REJECTED')}
                      className="reject-btn"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className={`status-badge ${application.status.toLowerCase()}`}>
                    {application.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 