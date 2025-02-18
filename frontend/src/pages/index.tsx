import React, { useState, useEffect } from 'react';
import SignupForm from '../components/Auth/SignupForm';
import LoginForm from '../components/Auth/LoginForm';
import { useRouter } from 'next/router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import GoogleIcon from '@/components/icons/GoogleIcon';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const features = [
    { id: 1, name: "Computer Science", icon: "💻" },
    { id: 2, name: "Public Administration", icon: "🏛️" },
    { id: 3, name: "Healthcare", icon: "🏥" },
    { id: 4, name: "Engineering", icon: "⚡" },
    { id: 5, name: "IT Services", icon: "🖥️" },
    { id: 6, name: "Business Administration", icon: "💼" },
    { id: 7, name: "Data Science", icon: "📊" },
    { id: 8, name: "Show all", icon: "→" },
  ];

  const opportunities = [
    {
      company: "Tech Corp",
      position: "Software Engineering Intern",
      type: "Internship",
      location: "Remote"
    },
    {
      company: "Health Systems",
      position: "Healthcare Data Analyst",
      type: "Full-time",
      location: "New York, NY"
    },
    // Add more opportunities...
  ];

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <div className={styles.leftPanel}>
          <div className={styles.brandContainer}>
            <span className={styles.brandIcon}>🛠️</span>
            <h1 className={styles.brandName}>Volunteer</h1>
          </div>
          <h2 className={styles.tagline}>Start your learning journey with us.</h2>
          <p>Create personalized learning paths and track your progress.</p>
        </div>
        <div className={styles.rightPanel}>
          {isLogin ? (
            <LoginForm onToggle={() => setIsLogin(false)} />
          ) : (
            <SignupForm 
              onToggle={() => setIsLogin(true)}
              onSignupSuccess={() => {}}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const features = [
    { title: "Computer Science", icon: "💻" },
    { title: "Data Science", icon: "📊" },
    { title: "Business", icon: "💼" },
    { title: "Healthcare", icon: "🏥" },
    { title: "Engineering", icon: "⚡" },
    { title: "Design", icon: "🎨" },
    { title: "Marketing", icon: "📱" },
    { title: "Show all", icon: "→" }
  ];

  const opportunities = [
    {
      company: "Tech Corp",
      position: "Software Engineering Intern",
      type: "Internship",
      location: "Remote"
    },
    {
      company: "Health Systems",
      position: "Healthcare Data Analyst",
      type: "Full-time",
      location: "New York, NY"
    },
    // Add more opportunities...
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Tech Corp",
      text: "PathBuilder helped me structure my learning journey and connect with amazing mentors.",
      image: "/testimonials/sarah.jpg"
    },
    // Add more testimonials...
  ];

  const statistics = [
    { number: "50K+", label: "Active Learners" },
    { number: "1000+", label: "Learning Paths" },
    { number: "200+", label: "Industry Partners" },
    { number: "95%", label: "Success Rate" },
  ];

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Welcome to</span>
            <span className="block text-blue-600">Volunteer</span>
          </h1>
          <p className="mt-3 text-xl text-gray-600">
            Connect with organizations, find opportunities, and make a difference.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                href="/auth/login"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const Home = () => {
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
          <h2 className={styles.sectionTitle}>Why PathBuilder?</h2>
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
            <h2 className={styles.sectionTitle}>About Volunteer</h2>
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
            <h2 className={styles.sectionTitle}>How Volunteer Works</h2>
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
};

export default Home; 