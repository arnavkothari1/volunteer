import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PathService } from '../../api';
import { handleAPIError } from '../../utils/error';
import axios from 'axios';

interface FormData {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  totalSteps: number;
  tags: string[];
}

const initialFormData: FormData = {
  title: '',
  description: '',
  difficulty: 'beginner',
  category: '',
  totalSteps: 1,
  tags: []
};

interface FormErrors extends Partial<FormData> {
  submit?: string;
}

export const PathForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (formData.totalSteps < 1) newErrors.totalSteps = 1;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await PathService.createPath(formData);
      navigate('/paths');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const apiError = handleAPIError(err);
        setErrors(prev => ({ ...prev, submit: apiError.message }));
      } else {
        setErrors(prev => ({ ...prev, submit: 'An unexpected error occurred.' }));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTagInput = (input: string) => {
    const tags = input.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData({ ...formData, tags });
  };

  return (
    <form onSubmit={handleSubmit} className="path-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="difficulty">Difficulty</label>
        <select
          id="difficulty"
          value={formData.difficulty}
          onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as FormData['difficulty'] })}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags (comma-separated)</label>
        <input
          id="tags"
          type="text"
          value={formData.tags.join(', ')}
          onChange={(e) => handleTagInput(e.target.value)}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Path'}
      </button>
    </form>
  );
}; 