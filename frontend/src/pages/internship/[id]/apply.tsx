import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Application.module.css';

interface Internship {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  skills: string[];
  workLocation: string;
  isRemote: boolean;
  howToApply: string;
  status: string;
}

const ApplicationPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [internship, setInternship] = useState<Internship | null>(null);
  const [formData, setFormData] = useState({
    coverLetter: '',
    requirements: {} as Record<string, string>,
    skills: {} as Record<string, string>,
    contactEmail: '',
    contactPhone: ''
  });

  useEffect(() => {
    if (id) {
      fetchInternshipDetails();
    }
  }, [id]);

  const fetchInternshipDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/internship/${id}`);
      if (response.ok) {
        const data = await response.json();
        setInternship(data);
        
        // Initialize form fields based on requirements and skills
        const reqFields = data.requirements.reduce((acc: any, req: string) => {
          acc[req] = '';
          return acc;
        }, {});
        
        const skillFields = data.skills.reduce((acc: any, skill: string) => {
          acc[skill] = '';
          return acc;
        }, {});

        setFormData(prev => ({
          ...prev,
          requirements: reqFields,
          skills: skillFields
        }));
      }
    } catch (error) {
      console.error('Failed to fetch internship details:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          internshipId: id,
          coverLetter: formData.coverLetter,
          requirements: formData.requirements,
          skills: formData.skills,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone
        })
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Failed to submit application:', error);
      alert('Failed to submit application');
    }
  };

  if (!internship) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1>Apply for {internship.title}</h1>
      
      <form onSubmit={handleSubmit} className={styles.applicationForm}>
        <div className={styles.section}>
          <h2>Cover Letter</h2>
          <textarea
            className={styles.textArea}
            value={formData.coverLetter}
            onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
            placeholder="Write your cover letter..."
            required
          />
        </div>

        <div className={styles.section}>
          <h2>Requirements</h2>
          {internship.requirements.map((req) => (
            <div key={req} className={styles.field}>
              <label>{req}</label>
              <textarea
                className={styles.textArea}
                value={formData.requirements[req]}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  requirements: { ...prev.requirements, [req]: e.target.value }
                }))}
                placeholder={`Describe how you meet this requirement: ${req}`}
                required
              />
            </div>
          ))}
        </div>

        <div className={styles.section}>
          <h2>Skills</h2>
          {internship.skills.map((skill) => (
            <div key={skill} className={styles.field}>
              <label>{skill}</label>
              <textarea
                className={styles.textArea}
                value={formData.skills[skill]}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  skills: { ...prev.skills, [skill]: e.target.value }
                }))}
                placeholder={`Describe your experience with ${skill}`}
                required
              />
            </div>
          ))}
        </div>

        <div className={styles.section}>
          <h2>Contact Information</h2>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                contactEmail: e.target.value
              }))}
              placeholder="Your email address"
              required
            />
          </div>
          <div className={styles.field}>
            <label>Phone Number</label>
            <input
              type="tel"
              value={formData.contactPhone}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                contactPhone: e.target.value
              }))}
              placeholder="Your phone number"
              required
            />
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplicationPage; 