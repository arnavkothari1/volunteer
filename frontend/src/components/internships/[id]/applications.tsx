import { useState, useEffect } from 'react';
import { useRouter } from '../../../hooks/useRouter';
import { toast } from '../../ui/use-toast';

interface Application {
  id: string;
  studentName: string;
  status: string;
  createdAt: string;
  resume: string;
}

export default function Applications() {
  const router = useRouter();
  const { id } = router.query;
  const [applications, setApplications] = useState<Application[]>([]);

  const handleStatusUpdate = async (applicationId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await res.json();
      if (data.success) {
        setApplications(applications.map(app => 
          app.id === applicationId ? { ...app, status: newStatus } : app
        ));
        toast.success("Status updated successfully");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating application status");
    }
  };

  // Rest of the component using simplified table structure without external dependencies
  return (
    <div className="applications-container">
      <h1>Applications</h1>
      <div className="applications-grid">
        {applications.map((application) => (
          <div key={application.id} className="application-card">
            <h3>{application.studentName}</h3>
            <p>Applied: {new Date(application.createdAt).toLocaleDateString()}</p>
            <p>Status: {application.status}</p>
            <div className="action-buttons">
              <button onClick={() => handleStatusUpdate(application.id, 'ACCEPTED')}>
                Accept
              </button>
              <button onClick={() => handleStatusUpdate(application.id, 'REJECTED')}>
                Reject
              </button>
              <a href={application.resume} target="_blank" rel="noopener noreferrer">
                View Resume
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 