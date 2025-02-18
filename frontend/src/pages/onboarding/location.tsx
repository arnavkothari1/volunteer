import { useState } from 'react';
import { useRouter } from 'next/router';
import OnboardingProgress from '@/components/OnboardingProgress';
import styles from '@/styles/Onboarding.module.css';

const Location = () => {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!location) {
        throw new Error('Please enter a location');
      }

      // Use router.push with state
      await router.push({
        pathname: '/onboarding/user-type',
        query: { location }
      });

    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container} 
         style={{ 
           backgroundImage: 'url("/map-background.jpg")',
           backgroundSize: 'cover',
           backgroundPosition: 'center'
         }}>
      <OnboardingProgress currentStep={1} />
      <div className={styles.content}>
        <h1>Where are you located?</h1>
        <p>This helps us show you relevant opportunities in your area</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your city"
            className={styles.input}
            required
          />
          <button
            type="submit"
            disabled={loading || !location}
            className={styles.nextButton}
          >
            {loading ? 'Loading...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Location;