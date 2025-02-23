import { useRouter } from 'next/router';
import { useEffect, ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const loginPath = '/auth/login';
      
      if (!token && router.pathname !== loginPath) {
        router.push(loginPath);
      }
    }
  }, [router.pathname]);

  return <>{children}</>;
} 