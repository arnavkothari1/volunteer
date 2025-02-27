import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/internship-details.css';

interface Company {
  id: string;
  name: string;
  location: string;
  industry: string;
  mission?: string;
  description?: string;
}

interface Internship {
  id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  company?: Company;
  isRemote: boolean;
  requirements: string[];
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export default function InternshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInternshipDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/internships/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch internship details');
        }

        const data = await response.json();
        setInternship(data.internship);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch internship details');
      } finally {
        setLoading(false);
      }
    };

    fetchInternshipDetails();
  }, [id]);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading internship details...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <p className="error-message">{error}</p>
      <button onClick={() => navigate('/dashboard/student')} className="back-button">
        Back to Dashboard
      </button>
    </div>
  );
  
  if (!internship) return (
    <div className="not-found-container">
      <p>Internship not found</p>
      <button onClick={() => navigate('/dashboard/student')} className="back-button">
        Back to Dashboard
      </button>
    </div>
  );

  return (
    <div className="internship-details-container">
      <div className="internship-header">
        <button onClick={() => navigate('/dashboard/student')} className="back-button">
          ← Back to Dashboard
        </button>
        <div className="header-content">
          <h1>{internship.title}</h1>
          <span className={`status-badge ${internship.status.toLowerCase()}`}>
            {internship.status}
          </span>
        </div>
      </div>

      <div className="internship-content">
        <div className="company-section">
          <h2>Company Details</h2>
          <div className="company-info">
            <h3 className="company-name">{internship.company?.name}</h3>
            <p className="company-industry">Industry: {internship.company?.industry}</p>
            <p className="company-location">
              {internship.isRemote ? '🌐 Remote Position' : `📍 ${internship.location}`}
            </p>
            
            {internship.company?.mission && (
              <div className="company-mission">
                <h4>Our Mission</h4>
                <p>{internship.company.mission}</p>
              </div>
            )}
            
            {internship.company?.description && (
              <div className="company-description">
                <h4>About {internship.company.name}</h4>
                <p>{internship.company.description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="description-section">
          <h2>Description</h2>
          <p>{internship.description}</p>
        </div>

        <div className="requirements-section">
          <h2>Requirements</h2>
          <ul className="requirements-list">
            {internship.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="additional-info">
          <div className="info-item">
            <span className="label">Posted:</span>
            <span>{new Date(internship.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="info-item">
            <span className="label">Last Updated:</span>
            <span>{new Date(internship.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            onClick={() => navigate(`/internships/${id}/apply`)}
            className="apply-button"
          >
            Apply Now
          </button>
          <button 
            onClick={() => {/* Add save functionality */}}
            className="save-button"
          >
            Save for Later
          </button>
        </div>
      </div>
    </div>
  );
} 