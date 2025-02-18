import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '@/components/LoadingSpinner';
import { validateEmail } from '@/utils/validation';
import { requestPasswordReset } from '@/services/auth';
import styles from '@/styles/Auth.module.css';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      setIsLoading(false);
      return;
    }

    try {
      const result = await requestPasswordReset(email);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || 'Failed to send reset code');
      }
    } catch (err) {
      console.error('Error during password reset:', err);
      setError('An error occurred. Please try again.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authHeader}>
        <div className={styles.logo} onClick={() => router.push('/')}>
          <span className={styles.logoIcon}>🎓</span>
          PathBuilder
        </div>
      </div>

      <motion.div 
        className={styles.authCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Reset your password</h1>
        <p>Enter your email address and we&apos;ll send you a code to reset your password.</p>

        <AnimatePresence>
          {error && (
            <motion.div 
              className={styles.errorMessage}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div 
              className={styles.successMessage}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              Check your email for the reset code.
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              disabled={isLoading || success}
            />
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading || success}
          >
            {isLoading ? <LoadingSpinner /> : 'Send reset code'}
          </button>
        </form>

        <p className={styles.switchAuth}>
          Remember your password?{' '}
          <button onClick={() => router.push('/auth/login')}>
            Sign in
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage; 