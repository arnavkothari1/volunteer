import { Link } from 'react-router-dom';
import styles from '../styles/Sidebar.module.css';

export default function Sidebar() {
  return (
    <div className={styles['sidebar-container']}>
      <nav>
        <div className={styles.logo}>
          <h2>StudentVolunteer</h2>
        </div>
        <ul className={styles['nav-links']}>
          <li>
            <Link to="/" className={styles['nav-item']}>Home</Link>
          </li>
          <li>
            <Link to="/auth/login" className={`${styles['nav-item']} ${styles['auth-button']} ${styles.login}`}>Login</Link>
          </li>
          <li>
            <Link to="/auth/register" className={`${styles['nav-item']} ${styles['auth-button']} ${styles.signup}`}>Sign Up</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
} 