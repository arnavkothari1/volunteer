import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/CreateInternship.module.css';

interface InternshipForm {
  title: string;
  description: string;
  requirements: string[];
  skills: string[];
  workLocation: string;
  isRemote: boolean;
  howToApply: string;
}

const CreateInternship = () => {
  const router = useRouter();
  const { id: companyId } = router.query;
  
  const [formData, setFormData] = useState<InternshipForm>({
    title: '',
    description: '',
    requirements: [],
    skills: [],
    workLocation: '',
    isRemote: false,
    howToApply: ''
  });

  const [currentRequirement, setCurrentRequirement] = useState('');
  const [currentSkill, setCurrentSkill] = useState('');

  const addRequirement = () => {
    if (currentRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, currentRequirement.trim()]
      }));
      setCurrentRequirement('');
    }
  };

  const addSkill = () => {
    if (currentSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Sending internship data:', {
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements,
        skills: formData.skills,
        location: formData.workLocation,
        isRemote: formData.isRemote,
        howToApply: formData.howToApply,
        companyId: companyId
      });

      const response = await fetch('http://localhost:5000/api/internship', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          requirements: formData.requirements,
          skills: formData.skills,
          location: formData.workLocation,
          isRemote: formData.isRemote,
          howToApply: formData.howToApply,
          companyId: companyId
        })
      });

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.ok) {
        router.push(`/company/manage/${companyId}`);
      } else {
        alert(responseData.error || 'Failed to create internship');
      }
    } catch (error) {
      console.error('Failed to create internship:', error);
      alert('Failed to create internship');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create New Internship</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Position Title</label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Requirements</label>
          <div className={styles.addItemGroup}>
            <input
              type="text"
              value={currentRequirement}
              onChange={(e) => setCurrentRequirement(e.target.value)}
              placeholder="Add a requirement"
            />
            <button type="button" onClick={addRequirement} className={styles.addButton}>
              Add
            </button>
          </div>
          <div className={styles.tagsList}>
            {formData.requirements.map((req, index) => (
              <span key={index} className={styles.tag}>
                {req}
                <button
                  type="button"
                  onClick={() => removeRequirement(index)}
                  className={styles.removeTag}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Skills (Optional)</label>
          <div className={styles.addItemGroup}>
            <input
              type="text"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              placeholder="Add a skill"
            />
            <button type="button" onClick={addSkill} className={styles.addButton}>
              Add
            </button>
          </div>
          <div className={styles.tagsList}>
            {formData.skills.map((skill, index) => (
              <span key={index} className={styles.tag}>
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className={styles.removeTag}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="workLocation">Location</label>
          <input
            id="workLocation"
            type="text"
            value={formData.workLocation}
            onChange={(e) => setFormData(prev => ({ ...prev, workLocation: e.target.value }))}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.isRemote}
              onChange={(e) => setFormData(prev => ({ ...prev, isRemote: e.target.checked }))}
            />
            Remote Work Available
          </label>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="howToApply">How to Apply</label>
          <textarea
            id="howToApply"
            value={formData.howToApply}
            onChange={(e) => setFormData(prev => ({ ...prev, howToApply: e.target.value }))}
            placeholder="Explain the application process..."
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Post Internship
        </button>
      </form>
    </div>
  );
};

export default CreateInternship; 