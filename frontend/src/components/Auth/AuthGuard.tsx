import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { ROUTES, publicRoutes } from '@/utils/routes';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const authCheck = useCallback((url: string) => {
    const token = localStorage.getItem('token');
    const path = url.split('?')[0] as "/auth/login" | "/auth/signup" | "/";

    if (!token && !publicRoutes.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: ROUTES.LOGIN,
        query: { returnUrl: router.asPath }
      });
    } else {
      setAuthorized(true);
    }
  }, [router]);

  useEffect(() => {
    authCheck(router.asPath);

    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);
    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };
  }, [authCheck, router]);

  return authorized ? <>{children}</> : null;
};

export default AuthGuard; 