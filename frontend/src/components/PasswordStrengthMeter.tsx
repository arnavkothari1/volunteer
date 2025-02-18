import { motion } from 'framer-motion';
import styles from '@/styles/PasswordStrength.module.css';

interface Props {
  password: string;
}

const PasswordStrengthMeter = ({ password }: Props) => {
  const getStrength = (): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = getStrength();

  return (
    <div className={styles.container}>
      <div className={styles.meter}>
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.segment}
            animate={{
              backgroundColor: i < strength ? getColor(strength) : '#e0e0e0',
            }}
          />
        ))}
      </div>
      <span className={styles.label}>
        {getLabel(strength)}
      </span>
    </div>
  );
};

const getColor = (strength: number): string => {
  switch (strength) {
    case 1: return '#ff5252';
    case 2: return '#ffd740';
    case 3: return '#69f0ae';
    case 4: return '#00c853';
    default: return '#e0e0e0';
  }
};

const getLabel = (strength: number): string => {
  switch (strength) {
    case 1: return 'Weak';
    case 2: return 'Fair';
    case 3: return 'Good';
    case 4: return 'Strong';
    default: return 'Too weak';
  }
};

export default PasswordStrengthMeter; 