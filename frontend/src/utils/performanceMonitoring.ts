import { captureError } from './errorTracking';
import { trackEvent } from './analytics';
import { onCLS, onFID, onLCP, type Metric } from 'web-vitals';

export const monitorWebVitals = () => {
  onCLS((metric: Metric) => trackVital('CLS', metric.value, 0.1));
  onFID((metric: Metric) => trackVital('FID', metric.value, 100));
  onLCP((metric: Metric) => trackVital('LCP', metric.value, 2500));
};

const trackVital = (name: string, value: number, threshold: number) => {
  trackEvent({
    category: 'Web Vitals',
    action: name,
    value: Math.round(value)
  });

  if (value > threshold) {
    captureError(new Error(`Poor ${name} performance`), {
      metric: name,
      value,
      threshold
    });
  }
}; 