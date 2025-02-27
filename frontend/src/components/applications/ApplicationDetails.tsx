"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from '../../components/ui/use-toast';
import '../../styles/application-details.css';

interface Application {
  id: string;
  fullName: string;
  email: string;
  status: string;
  skills: string[];
  coverLetter: string;
  aadharCard: string;
  tenthMarksheet: string;
  createdAt: string;
  internship: {
    title: string;
    company: {
      name: string;
    }
  }
}

export default function ApplicationDetails() {
  const params = useParams();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicationDetails();
  }, []);

  const fetchApplicationDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/application/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) {
        throw new Error('Failed to fetch application details');
      }
      
      const data = await res.json();
      if (data.success) {
        setApplication(data.application);
      } else {
        toast.error(data.message || "Failed to load application details");
      }
    } catch (error) {
      toast.error("Failed to load application details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!application) return <div>Application not found</div>;

  return (
    <div className="application-details-container">
      <div className="application-header">
        <h1>Application Details</h1>
        <span className={`status-badge ${application.status.toLowerCase()}`}>
          {application.status}
        </span>
      </div>

      <div className="application-section">
        <h2>Applicant Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <label>Full Name</label>
            <p>{application.fullName}</p>
          </div>
          <div className="info-item">
            <label>Email</label>
            <p>{application.email}</p>
          </div>
          <div className="info-item">
            <label>Applied On</label>
            <p>{new Date(application.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="application-section">
        <h2>Skills</h2>
        <div className="skills-container">
          {application.skills.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>

      <div className="application-section">
        <h2>Cover Letter</h2>
        <div className="cover-letter">
          {application.coverLetter}
        </div>
      </div>

      <div className="application-section">
        <h2>Documents</h2>
        <div className="documents-grid">
          <div className="document-item">
            <h3>Aadhar Card</h3>
            <a href={application.aadharCard} target="_blank" rel="noopener noreferrer">
              View Document
            </a>
          </div>
          <div className="document-item">
            <h3>10th Marksheet</h3>
            <a href={application.tenthMarksheet} target="_blank" rel="noopener noreferrer">
              View Document
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 