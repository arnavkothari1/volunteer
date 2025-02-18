import { motion } from 'framer-motion';
import styles from '../styles/HeroIllustration.module.css';

const HeroIllustration = () => {
  return (
    <motion.div 
      className={styles.illustration}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.illustrationContent}>
        <div className={styles.person}>
          <div className={styles.laptop} />
          <div className={styles.books} />
          <div className={styles.certificates} />
        </div>
      </div>
    </motion.div>
  );
};

export default HeroIllustration; 