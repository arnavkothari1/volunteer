import { useState } from 'react';
import styles from '../styles/InterestsModal.module.css';

interface InterestsModalProps {
  onClose: () => void;
  currentInterests: string[];
  onUpdateInterests: (interests: string[]) => void;
}

const InterestsModal = ({ onClose, currentInterests, onUpdateInterests }: InterestsModalProps) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(currentInterests);
  const [showCollaborators, setShowCollaborators] = useState(false);

  const allInterests = [
    { category: "Technical", items: ["Web Development", "Mobile Development", "AI/ML", "Data Science"] },
    { category: "Business", items: ["Product Management", "Marketing", "Entrepreneurship"] },
    { category: "Creative", items: ["UI/UX Design", "Graphic Design", "Content Creation"] },
  ];

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSave = () => {
    onUpdateInterests(selectedInterests);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <div className={styles.modalContent}>
          <h2>Update Your Interests</h2>
          <p>Select the topics that interest you to get personalized recommendations</p>

          <div className={styles.interestCategories}>
            {allInterests.map(category => (
              <div key={category.category} className={styles.category}>
                <h3>{category.category}</h3>
                <div className={styles.interestGrid}>
                  {category.items.map(item => (
                    <button
                      key={item}
                      className={`${styles.interestButton} ${
                        selectedInterests.includes(item) ? styles.selected : ''
                      }`}
                      onClick={() => handleInterestToggle(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <button className={styles.secondaryButton} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.primaryButton} onClick={handleSave}>
              Save Interests
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestsModal; 