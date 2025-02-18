import { trackEvent } from './analytics';

// Essential performance tracking
export const trackCriticalOperation = async <T>(
  operation: string,
  func: () => Promise<T>
): Promise<T> => {
  const start = performance.now();
  try {
    return await func();
  } finally {
    const duration = performance.now() - start;
    if (duration > 1000) { // 1 second threshold
      trackEvent({
        category: 'Performance',
        action: operation,
        value: Math.round(duration)
      });
    }
  }
}; 