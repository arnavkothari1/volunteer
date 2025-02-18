import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Application.module.css';
import { User } from '@/types';

interface FormData {
  education: string;
  experience: string;
  skills: string;
  whyJoinUs: string;
  contactEmail: string;
  contactPhone: string;
}

const ApplicationPage = () => {
  const router = useRouter();
  const { id: internshipId } = router.query;
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<FormData>({
    education: '',
    experience: '',
    skills: '',
    whyJoinUs: '',
    contactEmail: '',
    contactPhone: ''
  });
  const [error, setError] = useState<string>('');

  // Add useEffect to fetch user data when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          // Pre-fill email if available
          setFormData(prev => ({
            ...prev,
            contactEmail: userData.email || ''
          }));
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/auth/login');
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    // Verify the internship exists and is open
    const verifyInternship = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/internships/${internshipId}`);
        const internship = await response.json();
        
        if (!internship || internship.status !== 'OPEN') {
          alert('This internship is not available');
          router.push('/');
        }
      } catch (error) {
        console.error('Error verifying internship:', error);
        router.push('/');
      }
    };

    if (internshipId) {
      verifyInternship();
    }
  }, [internshipId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...formData,
          internshipId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit application');
      }

      alert('Application submitted successfully!');
      router.push('/dashboard/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Application Form</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <section className={styles.section}>
          <h2>Professional Information</h2>
          <div className={styles.field}>
            <label>Education</label>
            <textarea
              value={formData.education}
              onChange={(e) => setFormData({...formData, education: e.target.value})}
              required
            />
          </div>
          <div className={styles.field}>
            <label>Experience</label>
            <textarea
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              required
            />
          </div>
          <div className={styles.field}>
            <label>Skills</label>
            <textarea
              value={formData.skills}
              onChange={(e) => setFormData({...formData, skills: e.target.value})}
              required
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2>Additional Questions</h2>
          <div className={styles.field}>
            <label>Why do you want to join our company?</label>
            <textarea
              value={formData.whyJoinUs}
              onChange={(e) => setFormData({...formData, whyJoinUs: e.target.value})}
              required
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2>Contact Information</h2>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
              required
            />
          </div>
          <div className={styles.field}>
            <label>Phone</label>
            <input
              type="tel"
              value={formData.contactPhone}
              onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
              required
            />
          </div>
        </section>

        <button type="submit" className={styles.submitButton}>
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplicationPage; 