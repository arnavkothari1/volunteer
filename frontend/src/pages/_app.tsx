import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { NotificationProvider } from '@/contexts/NotificationContext';
import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { OnboardingProvider } from '../contexts/OnboardingContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const token = localStorage.getItem('token');
      const path = router.pathname;

      if (!token && path.startsWith('/dashboard')) {
        await router.push('/auth/login');
      }
    };

    if (router.isReady) {
      handleAuth();
    }
  }, [router.isReady, router.pathname]);

  return (
    <ErrorBoundary>
      <OnboardingProvider>
        <NotificationProvider>
          <div className={inter.className}>
            <Component {...pageProps} />
          </div>
        </NotificationProvider>
      </OnboardingProvider>
    </ErrorBoundary>
  );
}

export default MyApp; 