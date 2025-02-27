import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '../../components/ui/use-toast';
import '../../styles/create-internship.css';

interface InternshipForm {
  title: string;
  description: string;
  location: string;
  status: string;
  isRemote: boolean;
  requirements: string[];
}

export default function CreateInternship() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<InternshipForm>({
    title: '',
    description: '',
    location: '',
    status: 'OPEN',
    isRemote: false,
    requirements: ['']
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/internships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          requirements: formData.requirements.filter(req => req.trim() !== '')
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Internship created successfully!');
        navigate('/dashboard/organizer');
      } else {
        toast.error(data.message || 'Failed to create internship');
        if (data.message === 'Please create a company profile first') {
          navigate('/company/create');
        }
      }
    } catch (error) {
      toast.error('Failed to create internship');
    }
  };

  return (
    <div className="create-internship-container">
      <div className="form-header">
        <h1>Create New Internship</h1>
        <p>Post a new internship opportunity for students</p>
      </div>

      <form onSubmit={handleSubmit} className="internship-form">
        <div className="form-group">
          <label htmlFor="title">Position Title</label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
            placeholder="e.g., Logistics Intern"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
            placeholder="Describe the internship role, responsibilities, and expectations"
            rows={6}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            required
            placeholder="e.g., Hyderabad, Telangana"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="OPEN">Open</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={formData.isRemote}
                onChange={(e) => setFormData({...formData, isRemote: e.target.checked})}
              />
              Remote Position
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="requirements">Requirements (one per line)</label>
          <textarea
            id="requirements"
            value={formData.requirements.join('\n')}
            onChange={(e) => setFormData({...formData, requirements: e.target.value.split('\n')})}
            required
            placeholder="e.g.,&#10;Strong programming skills&#10;Excellent communication skills"
            rows={5}
          />
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate('/dashboard/organizer')} 
            className="cancel-btn"
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Create Internship
          </button>
        </div>
      </form>
    </div>
  );
} 