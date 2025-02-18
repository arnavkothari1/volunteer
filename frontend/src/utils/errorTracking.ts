import * as Sentry from '@sentry/react';

interface ErrorContext {
  duration?: number;
  operation?: string;
  metric?: string;
  [key: string]: string | number | undefined;
}

export const initializeErrorTracking = () => {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    tracesSampleRate: 0.1,
    environment: process.env.NODE_ENV
  });
};

export const captureError = (error: Error, context?: ErrorContext) => {
  Sentry.captureException(error, {
    extra: context
  });
}; 