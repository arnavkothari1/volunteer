import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/Dashboard.module.css';

const ProgressPage = () => {
  const [userProfile, setUserProfile] = useState<any>(null);

  // ... fetch user profile code similar to dashboard ...

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/dashboard">Home</Link>
        <Link href="/dashboard/progress" className={styles.active}>Progress</Link>
        <Link href="/dashboard/achievements">Achievements</Link>
        <Link href="/settings">Settings</Link>
      </nav>

      <div className={styles.studentCard}>
        <div className={styles.studentInfo}>
          <span className={styles.name}>{userProfile?.name}</span>
          <span className={styles.details}>
            ID: {userProfile?.userId} | {userProfile?.role} | {userProfile?.location}
          </span>
        </div>
      </div>

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>Your Progress</h1>
        <div className={styles.progressContent}>
          <div className={styles.progressCard}>
            <h3>Applications</h3>
            <p>Total Applications: 0</p>
            <p>Pending: 0</p>
            <p>Accepted: 0</p>
          </div>
          {/* Add more progress metrics as needed */}
        </div>
      </main>
    </div>
  );
};

export default ProgressPage; 