import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Applicants.module.css';

interface Application {
  id: string;
  userId: string;
  user: {
    name: string;
    email: string;
  };
  coverLetter: string;
  requirements: Record<string, string>;
  skills: Record<string, string>;
  status: string;
  createdAt: string;
}

const ApplicantsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [applications, setApplications] = useState<Application[]>([]);
  const [internship, setInternship] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchApplications();
      fetchInternshipDetails();
    }
  }, [id]);

  const fetchApplications = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/internship/${id}/applications`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    }
  };

  const fetchInternshipDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/internship/${id}`);
      if (response.ok) {
        const data = await response.json();
        setInternship(data);
      }
    } catch (error) {
      console.error('Failed to fetch internship details:', error);
    }
  };

  if (!internship) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Applicants for {internship.title}</h1>
        <p className={styles.meta}>Total Applications: {applications.length}</p>
      </div>

      {applications.length === 0 ? (
        <div className={styles.noApplications}>
          <p>No applications received yet.</p>
        </div>
      ) : (
        <div className={styles.applicationsList}>
          {applications.map((application) => (
            <div key={application.id} className={styles.applicationCard}>
              <div className={styles.applicantInfo}>
                <h3>{application.user.name}</h3>
                <p>{application.user.email}</p>
                <p>Applied on: {new Date(application.createdAt).toLocaleDateString()}</p>
              </div>

              <div className={styles.applicationDetails}>
                <div className={styles.section}>
                  <h4>Cover Letter</h4>
                  <p>{application.coverLetter}</p>
                </div>

                <div className={styles.section}>
                  <h4>Requirements</h4>
                  {Object.entries(application.requirements).map(([req, response]) => (
                    <div key={req} className={styles.requirement}>
                      <h5>{req}</h5>
                      <p>{response}</p>
                    </div>
                  ))}
                </div>

                <div className={styles.section}>
                  <h4>Skills</h4>
                  {Object.entries(application.skills).map(([skill, response]) => (
                    <div key={skill} className={styles.skill}>
                      <h5>{skill}</h5>
                      <p>{response}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.actions}>
                <button className={styles.acceptButton}>Accept</button>
                <button className={styles.rejectButton}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicantsPage; 