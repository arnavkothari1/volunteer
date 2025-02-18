import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/Dashboard.module.css';

const SettingsPage = () => {
  const [userProfile, setUserProfile] = useState<any>(null);

  // ... fetch user profile code similar to dashboard ...

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/dashboard">Home</Link>
        <Link href="/dashboard/progress">Progress</Link>
        <Link href="/dashboard/achievements">Achievements</Link>
        <Link href="/settings" className={styles.active}>Settings</Link>
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
        <h1 className={styles.pageTitle}>Settings</h1>
        <div className={styles.settingsContent}>
          <div className={styles.settingsCard}>
            <h3>Account Settings</h3>
            {/* Add settings options as needed */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage; 