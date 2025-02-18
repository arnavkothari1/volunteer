import styles from '@/styles/Onboarding.module.css';

interface Props {
  currentStep: number;
}

const OnboardingProgress = ({ currentStep }: Props) => {
  const steps = [
    { number: 1, label: 'User Type' },
    { number: 2, label: 'Location' },
    { number: 3, label: 'Complete' }
  ];

  return (
    <div className={styles.progressContainer}>
      {steps.map((step) => (
        <div
          key={step.number}
          className={`${styles.step} ${
            currentStep >= step.number ? styles.active : ''
          }`}
        >
          <span className={styles.number}>{step.number}</span>
          <span className={styles.label}>{step.label}</span>
        </div>
      ))}
    </div>
  );
};

export default OnboardingProgress; 