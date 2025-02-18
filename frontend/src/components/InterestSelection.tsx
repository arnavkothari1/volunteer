import { useState } from 'react';
import styles from '../styles/InterestSelection.module.css';

interface InterestSelectionProps {
  onComplete: () => void;
}

const InterestSelection: React.FC<InterestSelectionProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  
  const learningPaths = [
    {
      id: 1,
      name: "Computer Science",
      icon: "💻",
      description: "Dive into programming, algorithms, and software development",
      subPaths: ["Web Development", "Mobile Apps", "AI/ML", "Cybersecurity"]
    },
    {
      id: 2,
      name: "Data Science",
      icon: "📊",
      description: "Master data analysis, visualization, and machine learning",
      subPaths: ["Python", "Statistics", "Big Data", "Data Visualization"]
    },
    // Add more paths...
  ];

  return (
    <div className={styles.fullscreenOverlay}>
      <div className={styles.welcomeContainer}>
        {step === 1 && (
          <div className={styles.stepContent}>
            <h1>Welcome to Your Learning Journey! 🎓</h1>
            <p className={styles.subtitle}>Let&apos;s personalize your experience to help you achieve your goals.</p>
            
            <div className={styles.pathGrid}>
              {learningPaths.map(path => (
                <button key={path.id} className={styles.pathCard}>
                  <span className={styles.pathIcon}>{path.icon}</span>
                  <h3>{path.name}</h3>
                  <p>{path.description}</p>
                  <div className={styles.subPaths}>
                    {path.subPaths.map(subPath => (
                      <span key={subPath} className={styles.subPathTag}>
                        {subPath}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={styles.navigationButtons}>
          <button className={styles.skipButton} onClick={() => setStep(step + 1)}>
            Skip for now
          </button>
          <button className={styles.nextButton} onClick={() => setStep(step + 1)}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterestSelection; 