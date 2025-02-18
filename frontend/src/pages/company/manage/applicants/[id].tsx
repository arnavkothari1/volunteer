import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Applicants.module.css';

const ApplicantsView = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const router = useRouter();
  const { companyId, internshipId } = router.query;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/applications/internship/${internshipId}`, {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setApplications(data);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    if (internshipId) {
      fetchApplications();
    }
  }, [internshipId]);

  return (
    <div className={styles.container}>
      <h1>Applications</h1>
      <div className={styles.applicationsGrid}>
        {applications.map((app) => (
          <div key={app.id} className={styles.applicationCard}>
            <div className={styles.header}>
              <h2>{app.name}</h2>
              <span className={`${styles.status} ${styles[app.status.toLowerCase()]}`}>
                {app.status}
              </span>
            </div>
            
            <div className={styles.details}>
              <p><strong>Age:</strong> {app.age}</p>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Phone:</strong> {app.phone}</p>
              <p><strong>Education:</strong> {app.education}</p>
              <p><strong>Experience:</strong> {app.experience}</p>
              <p><strong>Skills:</strong> {app.skills}</p>
              <p><strong>Why Join:</strong> {app.whyJoin}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicantsView; 