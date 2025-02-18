import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/styles/Header.module.css';

const Header = () => {
  const router = useRouter();

  const navItems = [
    { label: 'Articles', icon: '📄', href: '/articles' },
    { label: 'People', icon: '👥', href: '/people' },
    { label: 'Learning', icon: '📚', href: '/learning' },
    { label: 'Internships', icon: '💼', href: '/internships' },
    { label: 'Volunteer Work', icon: '🤝', href: '/volunteer' },
  ];

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          PathBuilder
        </Link>

        <div className={styles.navItems}>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={styles.navItem}>
              <span className={styles.icon}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>

        <div className={styles.authButtons}>
          <button
            className={styles.joinButton}
            onClick={() => router.push('/auth/signup')}
          >
            Join now
          </button>
          <button
            className={styles.signInButton}
            onClick={() => router.push('/auth/login')}
          >
            Sign in
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header; 