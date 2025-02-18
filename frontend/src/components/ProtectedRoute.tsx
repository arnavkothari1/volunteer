import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredSteps?: string[];
}

const ProtectedRoute = ({ children, requiredSteps = [] }: ProtectedRouteProps) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    // Check if all required steps are completed
    const missingStep = requiredSteps.find(step => !localStorage.getItem(step));
    if (missingStep) {
      router.push(`/onboarding/${missingStep}`);
      return;
    }

    setIsAuthorized(true);
  }, [router, requiredSteps]);

  return isAuthorized ? <>{children}</> : null;
};

export default ProtectedRoute; 