import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import Sidebar from './Sidebar';

export default function Home() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles['main-content']}>
        <section className={styles.hero}>
          <div className={styles['hero-content']}>
            <h1 className={styles['hero-title']}>Build Your Learning Path Easily!</h1>
            <p className={styles['hero-subtitle']}>
              Join millions of students, educators, and professionals. Build your personalized learning path today.
            </p>
          </div>
        </section>

        <section className={styles['features-section']}>
          <h2 className={styles['section-title']}>Why StudentVolunteer?</h2>
          <div className={styles['feature-grid']}>
            <div className={styles['feature-card']}>
              <h3 className={styles['feature-title']}>Volunteer Work</h3>
              <p className={styles['feature-text']}>
                Find meaningful volunteer opportunities that align with your interests and career goals.
              </p>
            </div>

            <div className={styles['feature-card']}>
              <h3 className={styles['feature-title']}>Blogs</h3>
              <p className={styles['feature-text']}>
                Access insightful articles and stay updated with the latest trends in your field.
              </p>
            </div>

            <div className={styles['feature-card']}>
              <h3 className={styles['feature-title']}>Learning</h3>
              <p className={styles['feature-text']}>
                Explore curated learning paths and resources to enhance your skills.
              </p>
            </div>

            <div className={styles['feature-card']}>
              <h3 className={styles['feature-title']}>Internships</h3>
              <p className={styles['feature-text']}>
                Discover internship opportunities that kickstart your career journey.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.aboutSection}>
          <div className={styles.aboutContent}>
            <h2 className={styles['section-title']}>About StudentVolunteer</h2>
            <div className={styles.aboutGrid}>
              <div className={styles.aboutItem}>
                <h3 className={styles.aboutItemTitle}>Our Mission</h3>
                <p className={styles.aboutItemText}>
                  To provide a platform for students to build their learning paths and get real-world experience.
                </p>
              </div>
              <div className={styles.aboutItem}>
                <h3 className={styles.aboutItemTitle}>What We Solve</h3>
                <p className={styles.aboutItemText}>
                  We bridge the gap between education and industry requirements by offering:
                </p>
                <ul className={styles.aboutList}>
                  <li className={styles.aboutListItem}>Structured learning paths</li>
                  <li className={styles.aboutListItem}>Real-world experience opportunities</li>
                  <li className={styles.aboutListItem}>Educational networking</li>
                  <li className={styles.aboutListItem}>Career guidance and resources (Coming Soon)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.explanationSection}>
          <div className={styles.explanationContent}>
            <h2 className={styles['section-title']}>How StudentVolunteer Works</h2>
            <div className={styles.stepGrid}>
              <div className={styles.step}>
                <h3 className={styles.stepTitle}>1. Create Your Profile</h3>
                <p className={styles.stepText}>Sign up and customize your profile to reflect your interests and career goals.</p>
              </div>
              <div className={styles.step}>
                <h3 className={styles.stepTitle}>2. Explore Opportunities</h3>
                <p className={styles.stepText}>Browse through volunteer work, internships, and learning resources.</p>
              </div>
              <div className={styles.step}>
                <h3 className={styles.stepTitle}>3. Build Your Path</h3>
                <p className={styles.stepText}>Select activities and resources that align with your career objectives.</p>
              </div>
              <div className={styles.step}>
                <h3 className={styles.stepTitle}>4. Track Progress (Coming Soon)</h3>
                <p className={styles.stepText}>Monitor your growth and achievements as you progress in your journey.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 