import { useState } from 'react';
import styles from '@/styles/EditCompanyModal.module.css';
import { Company } from '@/types';

interface Props {
  company: Company;
  onClose: () => void;
  onSave: () => void;
}

const EditCompanyModal = ({ company, onClose, onSave }: Props) => {
  const [formData, setFormData] = useState({
    name: company.name,
    description: company.description,
    userPosition: company.userPosition,
    location: company.location,
    interests: company.interests,
    isRemote: company.isRemote,
    occupiedPositions: company.occupiedPositions
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/company/${company.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSave();
        onClose();
      }
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Edit Company</h2>
        <form onSubmit={handleSubmit}>
          {/* Add form fields similar to company creation */}
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditCompanyModal; 