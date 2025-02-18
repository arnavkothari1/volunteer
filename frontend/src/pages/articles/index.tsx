import { NextPage } from 'next';
import styles from '@/styles/Articles.module.css';
import Sidebar from '@/components/Sidebar';

const ArticlesPage: NextPage = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <h1 className={styles.title}>Articles</h1>
          <div className={styles.articleGrid}>
            {/* Article cards will go here */}
            <div className={styles.articleCard}>
              <h2>Getting Started with PathBuilder</h2>
              <p>Learn how to make the most of your learning journey...</p>
            </div>
            {/* More article cards */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticlesPage; 