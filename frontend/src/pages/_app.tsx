import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { NotificationProvider } from '@/contexts/NotificationContext';
import AuthGuard from '@/components/Auth/AuthGuard';
import { publicRoutes } from '@/utils/routes';
import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { OnboardingProvider } from '../contexts/OnboardingContext';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isPublicRoute = publicRoutes.includes(router.pathname as "/auth/login" | "/auth/signup" | "/");

  return (
    <OnboardingProvider>
      <NotificationProvider>
        <div className={inter.className}>
          {isPublicRoute ? (
            <Component {...pageProps} />
          ) : (
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
          )}
        </div>
      </NotificationProvider>
    </OnboardingProvider>
  );
}

export default MyApp; 