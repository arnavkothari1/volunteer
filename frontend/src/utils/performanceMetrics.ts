import { trackEvent } from './analytics';
import { captureError } from './errorTracking';


export const trackRenderTime = (componentName: string, startTime: number) => {
  const endTime = performance.now();
  const renderTime = endTime - startTime;

  if (renderTime > 100) {
    trackEvent({
      category: 'Performance',
      action: 'SlowRender',
      label: componentName,
      value: Math.round(renderTime)
    });
  }
};

export const trackAPICall = async <T>(
  endpoint: string,
  apiCall: () => Promise<T>
): Promise<T> => {
  const startTime = performance.now();
  try {
    const result = await apiCall();
    const duration = performance.now() - startTime;

    trackEvent({
      category: 'API',
      action: endpoint,
      value: Math.round(duration)
    });

    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    captureError(error as Error, {
      endpoint,
      duration: Math.round(duration)
    });
    throw error;
  }
}; 