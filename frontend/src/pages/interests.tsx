import { useEffect } from 'react';
import { useRouter } from 'next/router';
import InterestSelection from '../components/InterestSelection';

const InterestsPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  const handleComplete = () => {
    router.push('/dashboard');
  };

  return <InterestSelection onComplete={handleComplete} />;
};

export default InterestsPage; 