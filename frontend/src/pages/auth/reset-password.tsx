import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '@/components/LoadingSpinner';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';
import { validatePassword } from '@/utils/validation';
import { verifyResetCode, resetPassword } from '@/services/auth';
import styles from '@/styles/Auth.module.css';

const ResetPasswordPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    code: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [codeVerified, setCodeVerified] = useState(false);

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await verifyResetCode(formData.code);
      if (result.success) {
        setCodeVerified(true);
      } else {
        setError(result.error || 'Invalid code');
      }
    } catch (err) {
      console.error('Error during code verification:', err);
      setError('Invalid code. Please try again.');
    }

    setIsLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      setIsLoading(false);
      return;
    }

    try {
      const result = await resetPassword(formData.code, formData.password);
      if (result.success) {
        router.push('/auth/login?reset=success');
      } else {
        setError(result.error || 'Failed to reset password');
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
        <h1>{codeVerified ? 'Create new password' : 'Enter reset code'}</h1>
        <p>{codeVerified ? 'Please enter your new password.' : 'Enter the code we sent to your email.'}</p>

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
        </AnimatePresence>

        <form onSubmit={codeVerified ? handleResetPassword : handleVerifyCode} className={styles.authForm}>
          {!codeVerified ? (
            <div className={styles.inputGroup}>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
                placeholder="Enter 6-digit code"
                required
                disabled={isLoading}
                maxLength={6}
              />
            </div>
          ) : (
            <>
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="New password"
                  required
                  disabled={isLoading}
                />
                <PasswordStrengthMeter password={formData.password} />
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  placeholder="Confirm new password"
                  required
                  disabled={isLoading}
                />
              </div>
            </>
          )}

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : (codeVerified ? 'Reset Password' : 'Verify Code')}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage; 