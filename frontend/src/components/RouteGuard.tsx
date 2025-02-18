import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface User {
  userType: string;
}

const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          credentials: 'include'
        });
        const data = await response.json();
        
        console.log('Current user:', data); // Debug log

        if (data.user?.userType === 'ORGANIZER' && router.pathname === '/dashboard/student') {
          console.log('Redirecting organizer to company create'); // Debug log
          window.location.href = '/company/create';
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    checkUser();
  }, [router.pathname]);

  return <>{children}</>;
};

export default RouteGuard; 