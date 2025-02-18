import { motion } from 'framer-motion';
import GoogleIcon from '@/components/icons/GoogleIcon';
import GithubIcon from '@/components/icons/GithubIcon';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import styles from '@/styles/Auth.module.css';

interface SocialAuthProps {
  isLoading: boolean;
  onGoogleAuth: () => Promise<void>;
  onGithubAuth: () => Promise<void>;
  onLinkedInAuth: () => Promise<void>;
}

const SocialAuth = ({ isLoading, onGoogleAuth, onGithubAuth, onLinkedInAuth }: SocialAuthProps) => {
  return (
    <div className={styles.socialButtons}>
      <motion.button 
        className={styles.googleButton}
        onClick={onGoogleAuth}
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <GoogleIcon />
        Continue with Google
      </motion.button>

      <motion.button 
        className={styles.githubButton}
        onClick={onGithubAuth}
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <GithubIcon />
        Continue with GitHub
      </motion.button>

      <motion.button 
        className={styles.linkedinButton}
        onClick={onLinkedInAuth}
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <LinkedInIcon />
        Continue with LinkedIn
      </motion.button>
    </div>
  );
};

export default SocialAuth; 