import { NextPage } from 'next';
import styles from '@/styles/Internships.module.css';
import Sidebar from '@/components/Sidebar';

const InternshipsPage: NextPage = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <h1 className={styles.title}>Internship Opportunities</h1>
          <div className={styles.internshipGrid}>
            <div className={styles.internshipCard}>
              <h2>Software Engineering Intern</h2>
              <p className={styles.company}>Tech Corp</p>
              <p className={styles.location}>San Francisco, CA</p>
              <button className={styles.applyButton}>Apply Now</button>
            </div>
            {/* More internship listings */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InternshipsPage; 