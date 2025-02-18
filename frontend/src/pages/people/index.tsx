import { NextPage } from 'next';
import styles from '@/styles/People.module.css';
import Sidebar from '@/components/Sidebar';

const PeoplePage: NextPage = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <h1 className={styles.title}>Connect with People</h1>
          <div className={styles.peopleGrid}>
            {/* People cards will go here */}
            <div className={styles.personCard}>
              <div className={styles.personInfo}>
                <h3>John Doe</h3>
                <p>Computer Science Student</p>
              </div>
            </div>
            {/* More people cards */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PeoplePage; 