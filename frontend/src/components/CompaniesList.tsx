import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/CompaniesList.module.css';

interface Company {
  id: string;
  name: string;
  description: string;
  location: string;
  isRemote: boolean;
  occupiedPositions: string[];
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  internships: any[];
}

const CompaniesList = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/company/all');
        if (response.ok) {
          const data = await response.json();
          setCompanies(data);
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Companies</h2>
      <div className={styles.companiesList}>
        {companies.map((company) => (
          <div key={company.id} className={styles.companyCard}>
            <h3>{company.name}</h3>
            <p className={styles.description}>{company.description}</p>
            
            <div className={styles.details}>
              <div className={styles.detailItem}>
                <span className={styles.label}>Location:</span>
                <span>{company.location}</span>
                {company.isRemote && <span className={styles.badge}>Remote Available</span>}
              </div>
              
              <div className={styles.detailItem}>
                <span className={styles.label}>Created by:</span>
                <span>{company.user.firstName} {company.user.lastName}</span>
              </div>

              <div className={styles.positions}>
                <span className={styles.label}>Positions:</span>
                <div className={styles.positionsList}>
                  {company.occupiedPositions.map((position, index) => (
                    <span key={index} className={styles.positionTag}>{position}</span>
                  ))}
                </div>
              </div>

              <div className={styles.openings}>
                <span className={styles.label}>Open Positions:</span>
                <span className={styles.openingsCount}>
                  {company.internships.length} openings
                </span>
              </div>
            </div>

            <button 
              onClick={() => router.push(`/company/manage/${company.id}`)}
              className={styles.viewButton}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompaniesList; 