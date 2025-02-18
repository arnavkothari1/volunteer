import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../../styles/Auth.module.css';

interface LoginFormProps {
  onToggle: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggle }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Login response:', data); // For debugging
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to connect to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Welcome Back!</h2>
      <p className={styles.formSubtitle}>Continue your learning journey</p>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.socialButtons}>
        <button type="button" className={styles.socialButton}>
          <Image src="/google.svg" alt="Google" width={20} height={20} />
          <span>Continue with Google</span>
        </button>
        <button type="button" className={styles.socialButton}>
          <Image src="/linkedin.svg" alt="LinkedIn" width={20} height={20} />
          <span>Continue with LinkedIn</span>
        </button>
      </div>

      <div className={styles.divider}>
        <span>or sign in with email</span>
      </div>

      <form onSubmit={handleLogin} className={styles.form}>
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

        <div className={styles.rememberForgot}>
          <label className={styles.checkbox}>
            <input type="checkbox" /> Remember me
          </label>
          <button type="button" className={styles.forgotButton}>
            Forgot password?
          </button>
        </div>

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <p className={styles.switchPrompt}>
        Don&apos;t have an account?{' '}
        <button type="button" className={styles.switchButton} onClick={onToggle}>
          Sign up
        </button>
      </p>
    </div>
  );
};

export default LoginForm; 