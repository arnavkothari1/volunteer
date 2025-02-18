import { NextPage } from 'next';
import styles from '@/styles/Learning.module.css';
import Sidebar from '@/components/Sidebar';

const LearningPage: NextPage = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <h1 className={styles.title}>Learning Paths</h1>
          <div className={styles.pathGrid}>
            <div className={styles.pathCard}>
              <h2>Web Development</h2>
              <p>Master modern web technologies and frameworks</p>
              <button className={styles.startButton}>Start Learning</button>
            </div>
            {/* More learning paths */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningPage; 