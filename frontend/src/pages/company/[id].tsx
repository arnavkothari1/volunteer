import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/styles/Company.module.css';

interface Internship {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  skills: string[];
  workLocation: string;
  isRemote: boolean;
  howToApply: string;
  status: string;
}

interface Company {
  id: string;
  name: string;
  description: string;
  location: string;
  createdBy: {
    name: string;
    role: string;
  };
  internships: Internship[];
}

const CompanyPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [company, setCompany] = useState<Company | null>(null);
  const [isOrganizer, setIsOrganizer] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCompanyDetails();
      checkOrganizerStatus();
    }
  }, [id]);

  const fetchCompanyDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/company/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCompany(data);
      }
    } catch (error) {
      console.error('Failed to fetch company details:', error);
    }
  };

  const checkOrganizerStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const profile = await response.json();
        setIsOrganizer(profile.role === 'ORGANIZER');
      }
    } catch (error) {
      console.error('Failed to check organizer status:', error);
    }
  };

  if (!company) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.companyHeader}>
        <h1>{company.name}</h1>
        <p className={styles.description}>{company.description}</p>
        <div className={styles.meta}>
          <p>Location: {company.location}</p>
          <p>Posted by: {company.createdBy.name}</p>
          <p>Position: {company.createdBy.role}</p>
        </div>
      </div>

      <div className={styles.openPositions}>
        <h2>Open Positions</h2>
        {company.internships?.length === 0 ? (
          <p>No open positions at the moment.</p>
        ) : (
          <div className={styles.internshipsList}>
            {company.internships?.map((internship) => (
              <div key={internship.id} className={styles.card}>
                <h3>{internship.title}</h3>
                <p>{internship.description}</p>
                
                <div className={styles.internshipDetails}>
                  <div className={styles.detailsSection}>
                    <h4>Requirements:</h4>
                    <ul>
                      {internship.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={styles.detailsSection}>
                    <h4>Skills:</h4>
                    <ul>
                      {internship.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={styles.locationInfo}>
                    <p>Location: {internship.workLocation}</p>
                    <p>Remote: {internship.isRemote ? 'Yes' : 'No'}</p>
                    <p>Status: {internship.status}</p>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.status}>{internship.status}</span>
                  <Link 
                    href={`/application/${internship.id}`}
                    className={styles.applyButton}
                  >
                    Apply Now
                  </Link>
                  {isOrganizer && (
                    <button 
                      className={styles.viewApplicantsButton}
                      onClick={() => router.push(`/company/${company.id}/internship/${internship.id}/applicants`)}
                    >
                      View Applicants
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyPage; 