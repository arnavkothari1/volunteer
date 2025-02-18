import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../../styles/Auth.module.css';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/utils/animations';
import { ROUTES } from '@/utils/routes';
import { signup as signupUser } from '@/services/auth';

interface SignupFormProps {
  onToggle: () => void;
  onSignupSuccess?: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onToggle }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    try {
      const response = await signupUser(formData);
      if (response.success) {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        // Redirect to interests page after successful signup
        router.push(ROUTES.INTERESTS);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Cannot connect to server. Please try again later.');
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={fadeInUp}
      className={styles.formContainer}
    >
      <h2 className={styles.formTitle}>Create Account</h2>
      <p className={styles.formSubtitle}>Start your learning journey with us</p>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.socialButtons}>
        <button type="button" className={styles.socialButton}>
          <Image src="/google.svg" alt="Google" width={20} height={20} />
          <span>Sign up with Google</span>
        </button>
        <button type="button" className={styles.socialButton}>
          <Image src="/linkedin.svg" alt="LinkedIn" width={20} height={20} />
          <span>Sign up with LinkedIn</span>
        </button>
      </div>

      <div className={styles.divider}>
        <span>or sign up with email</span>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.nameFields}>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className={styles.input}
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className={styles.input}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className={styles.input}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className={styles.input}
          required
        />

        <button type="submit" className={styles.submitButton}>
          Create Account
        </button>
      </form>

      <p className={styles.switchPrompt}>
        Already have an account?{' '}
        <button type="button" className={styles.switchButton} onClick={onToggle}>
          Sign in
        </button>
      </p>
    </motion.div>
  );
};

export default SignupForm; 