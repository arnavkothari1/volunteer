import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/Dashboard.module.css';

const AchievementsPage = () => {
  const [userProfile, setUserProfile] = useState<any>(null);

  // ... fetch user profile code similar to dashboard ...

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/dashboard">Home</Link>
        <Link href="/dashboard/progress">Progress</Link>
        <Link href="/dashboard/achievements" className={styles.active}>Achievements</Link>
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
        <h1 className={styles.pageTitle}>Your Achievements</h1>
        <div className={styles.achievementsGrid}>
          <div className={styles.achievementCard}>
            <h3>First Application</h3>
            <p>Apply to your first internship</p>
            <span className={styles.locked}>Locked</span>
          </div>
          {/* Add more achievement cards as needed */}
        </div>
      </main>
    </div>
  );
};

export default AchievementsPage; 