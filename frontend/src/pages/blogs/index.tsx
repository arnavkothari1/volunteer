import { NextPage } from 'next';
import styles from '@/styles/Blogs.module.css';
import Sidebar from '@/components/Sidebar';

const BlogsPage: NextPage = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <h1 className={styles.title}>Blog Posts</h1>
          <div className={styles.blogGrid}>
            <div className={styles.blogCard}>
              <h2>Latest Trends in Tech Education</h2>
              <p>Exploring the evolving landscape of technical education...</p>
              <div className={styles.blogMeta}>
                <span>5 min read</span>
                <span>Education</span>
              </div>
            </div>
            {/* More blog posts */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogsPage; 