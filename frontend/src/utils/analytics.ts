interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export const trackEvent = ({ category, action, label, value }: AnalyticsEvent) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

export const trackPageView = (path: string) => {
  const trackingId = process.env.REACT_APP_GA_TRACKING_ID;
  if (window.gtag && trackingId) {
    window.gtag('config', trackingId, {
      page_path: path
    });
  }
}; 