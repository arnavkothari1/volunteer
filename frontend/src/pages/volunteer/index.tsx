import { NextPage } from 'next';
import styles from '@/styles/Volunteer.module.css';
import Sidebar from '@/components/Sidebar';

const VolunteerPage: NextPage = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <h1 className={styles.title}>Volunteer Opportunities</h1>
          <div className={styles.volunteerGrid}>
            <div className={styles.volunteerCard}>
              <h2>Code for Good</h2>
              <p>Help non-profits with their technical needs</p>
              <button className={styles.joinButton}>Join Project</button>
            </div>
            {/* More volunteer opportunities */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VolunteerPage; 