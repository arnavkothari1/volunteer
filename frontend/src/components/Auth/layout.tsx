import styles from '@/styles/Auth.module.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.brandSection}>
          <h1>PathBuilder</h1>
          <p>Your professional learning community</p>
        </div>
        {children}
      </div>
    </div>
  );
} 