import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/Dashboard.module.css';
import { api } from '@/utils/api';

export default function Dashboard() {
  const [profile, setProfile] = useState({
    firstName: '',
    role: '',
    location: '',
    interests: [],
    id: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await api.get('/profile');
      if (!response.error) {
        setProfile(response);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <input 
          type="text" 
          placeholder="Search..." 
          className={styles.searchInput} 
        />
        <nav className={styles.nav}>
          <Link href="/dashboard" className={`${styles.navItem} ${styles.active}`}>Home</Link>
          <Link href="/profile" className={styles.navItem}>Profile</Link>
          <Link href="/settings" className={styles.navItem}>Settings</Link>
        </nav>
      </div>
      <main className={styles.main}>
        <div className={styles.userCard}>
          <div className={styles.userIcon}>👤</div>
          <div className={styles.userInfo}>
            <div className={styles.infoRow}>
              <span>Name:</span>
              <span>{profile.firstName || 'Loading...'}</span>
            </div>
            <div className={styles.infoRow}>
              <span>Role:</span>
              <span>{profile.role || 'Loading...'}</span>
            </div>
            <div className={styles.infoRow}>
              <span>Location:</span>
              <span>{profile.location || 'Loading...'}</span>
            </div>
            <div className={styles.infoRow}>
              <span>Interests:</span>
              <span>{profile.interests?.join(', ') || 'Loading...'}</span>
            </div>
            <div className={styles.infoRow}>
              <span>ID:</span>
              <span>{profile.id || 'Loading...'}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 