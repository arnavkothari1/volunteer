import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/CompanyDashboard.module.css';
import { Company } from '@/types';

const CompanyDashboard = () => {
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkCompany = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/company/current', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          if (!data || data.company === null) {
            // No company found, redirect to create company page
            router.push('/dashboard/organizer');
          }
        } else if (response.status === 401) {
          // Unauthorized, redirect to login
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Error checking company:', error);
      }
    };

    checkCompany();
  }, [router]);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/company/current', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 404) {
          router.push('/dashboard/organizer');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch company');
        }
        
        const data = await response.json();
        setCompany(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Failed to load company data');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, []); // Empty dependency array - only run once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      {company ? (
        <>
          <div className={styles.header}>
            <h1 className={styles.companyTitle}>{company.name}</h1>
            <div className={styles.actionButtons}>
              <button 
                className={`${styles.button} ${styles.editButton}`}
                onClick={() => router.push('/dashboard/organizer')}
              >
                <span className={styles.buttonIcon}>✏️</span>
                Edit Company
              </button>
              <button 
                className={`${styles.button} ${styles.internshipButton}`}
                onClick={() => router.push('/company/internships/create')}
              >
                <span className={styles.buttonIcon}>🎓</span>
                Post an Internship
              </button>
              <button 
                className={`${styles.button} ${styles.taskButton}`}
                onClick={() => router.push('/company/tasks/create')}
              >
                <span className={styles.buttonIcon}>📋</span>
                Create Tasks
              </button>
            </div>
          </div>

          <div className={styles.content}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>About Us</h2>
              <p className={styles.description}>{company.description}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Company Details</h2>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Location:</span>
                  <span className={styles.detailValue}>{company.location}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Remote Work:</span>
                  <span className={styles.detailValue}>
                    {company.isRemote ? 'Available' : 'Not Available'}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Your Position:</span>
                  <span className={styles.detailValue}>{company.userPosition}</span>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Occupied Positions</h2>
              <div className={styles.positionsGrid}>
                {company.occupiedPositions.map((position, index) => (
                  <div key={index} className={styles.positionCard}>
                    <span className={styles.positionIcon}>👤</span>
                    {position}
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Company Specialties</h2>
              <div className={styles.specialtiesGrid}>
                {company.interests.map((specialty, index) => (
                  <div key={index} className={styles.specialtyTag}>
                    {specialty}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CompanyDashboard; 