import React from 'react';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.mainContent}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Build Your Path Easily!</h1>
          <p className={styles.subtitle}>
            Join millions of students, educators, and professionals. Build your personalized
            learning path today.
          </p>
        </section>

        <section className={styles.featuresSection}>
          <h2 className={styles.sectionTitle}>Why StudentVolunteer?</h2>
          <div className={styles.featureGrid}>
            <Link href="/volunteer" className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Volunteer Work</h3>
              <p className={styles.featureText}>
                Find meaningful volunteer opportunities that align with your interests and career goals.
              </p>
            </Link>

            <Link href="/blogs" className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Blogs</h3>
              <p className={styles.featureText}>
                Access insightful articles and stay updated with the latest trends in your field.
              </p>
            </Link>

            <Link href="/learning" className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Learning</h3>
              <p className={styles.featureText}>
                Explore curated learning paths and resources to enhance your skills.
              </p>
            </Link>

            <Link href="/internships" className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Internships</h3>
              <p className={styles.featureText}>
                Discover internship opportunities that kickstart your career journey.
              </p>
            </Link>
          </div>
        </section>

        <section className={styles.aboutSection}>
          <div className={styles.aboutContent}>
            <h2 className={styles.sectionTitle}>About StudentVolunteer</h2>
            <div className={styles.aboutGrid}>
              <div className={styles.aboutItem}>
                <h3 className={styles.aboutItemTitle}>Our Mission</h3>
                <p className={styles.aboutItemText}>
                  To empower individuals by providing a unified platform that combines learning, 
                  networking, and practical experience opportunities.
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
                  <li className={styles.aboutListItem}>Professional networking</li>
                  <li className={styles.aboutListItem}>Career guidance and resources</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.explanationSection}>
          <div className={styles.explanationContent}>
            <h2 className={styles.sectionTitle}>How StudentVolunteer Works</h2>
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
                <h3 className={styles.stepTitle}>4. Track Progress</h3>
                <p className={styles.stepText}>Monitor your growth and achievements as you progress in your journey.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 