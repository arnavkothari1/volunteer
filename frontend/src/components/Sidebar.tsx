import Link from 'next/link';
import { 
  FaNewspaper, 
  FaUsers, 
  FaGraduationCap, 
  FaBriefcase, 
  FaHandsHelping 
} from 'react-icons/fa';
import styles from '@/styles/Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <Link href="/" className={styles.logoLink}>
          <span className={styles.logoText}>StudentVolunteer</span>
        </Link>
      </div>

      <nav className={styles.navigation}>
        <Link href="/articles" className={styles.navItem}>
          <FaNewspaper className={styles.navIcon} />
          <span className={styles.navText}>Articles</span>
        </Link>

        <Link href="/people" className={styles.navItem}>
          <FaUsers className={styles.navIcon} />
          <span className={styles.navText}>People</span>
        </Link>

        <Link href="/learning" className={styles.navItem}>
          <FaGraduationCap className={styles.navIcon} />
          <span className={styles.navText}>Learning</span>
        </Link>

        <Link href="/internships" className={styles.navItem}>
          <FaBriefcase className={styles.navIcon} />
          <span className={styles.navText}>Internships</span>
        </Link>

        <Link href="/volunteer" className={styles.navItem}>
          <FaHandsHelping className={styles.navIcon} />
          <span className={styles.navText}>Volunteer Work</span>
        </Link>
      </nav>

      <div className={styles.authButtons}>
        <Link href="/auth/register" className={styles.joinButton}>
          Join now
        </Link>
        <Link href="/auth/login" className={styles.signInButton}>
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Sidebar; 