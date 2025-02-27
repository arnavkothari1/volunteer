import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/application-form.css';

interface ApplicationFormData {
  fullName: string;
  email: string;
  skills: string[];
  coverLetter: string;
  aadharCard: File | null;
  tenthMarksheet: File | null;
}

export default function ApplicationForm() {
  const { id } = useParams(); // internship id
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    skills: [''],
    coverLetter: '',
    aadharCard: null,
    tenthMarksheet: null
  });

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData({ ...formData, skills: newSkills });
  };

  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ''] });
  };

  const removeSkill = (index: number) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: newSkills });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, field: 'aadharCard' | 'tenthMarksheet') => {
    const file = event.target.files?.[0] || null;
    setFormData({ ...formData, [field]: file });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const submitData = new FormData();
      
      // Add all form data
      submitData.append('fullName', formData.fullName);
      submitData.append('email', formData.email);
      submitData.append('skills', JSON.stringify(formData.skills.filter(skill => skill.trim())));
      submitData.append('coverLetter', formData.coverLetter);
      if (formData.aadharCard) {
        submitData.append('aadharCard', formData.aadharCard);
      }
      if (formData.tenthMarksheet) {
        submitData.append('tenthMarksheet', formData.tenthMarksheet);
      }

      const response = await fetch(`http://localhost:5000/api/internships/${id}/apply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit application');
      }

      const data = await response.json();
      
      // Only navigate on success
      navigate('/dashboard/student', { 
        state: { 
          success: true,
          message: 'Application submitted successfully!' 
        } 
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      setError(error instanceof Error ? error.message : 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="application-form-container">
      <div className="form-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <h1>Internship Application</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="application-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Skills *</label>
          {formData.skills.map((skill, index) => (
            <div key={index} className="skill-input">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                placeholder="Enter a skill"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="remove-skill"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addSkill} className="add-skill">
            + Add Skill
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="coverLetter">Why do you want to join us? *</label>
          <textarea
            id="coverLetter"
            value={formData.coverLetter}
            onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
            required
            rows={6}
          />
        </div>

        <div className="form-group">
          <label htmlFor="aadharCard">Aadhar Card *</label>
          <input
            type="file"
            id="aadharCard"
            onChange={(e) => handleFileUpload(e, 'aadharCard')}
            accept=".pdf,.jpg,.jpeg,.png"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tenthMarksheet">10th Marksheet *</label>
          <input
            type="file"
            id="tenthMarksheet"
            onChange={(e) => handleFileUpload(e, 'tenthMarksheet')}
            accept=".pdf,.jpg,.jpeg,.png"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
} 