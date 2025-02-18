import { measurePerformance } from '../../../utils/performance';
import * as Sentry from '@sentry/react';

jest.mock('@sentry/react');

describe('Performance Monitoring', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('measures async operation duration', async () => {
    const metrics = await measurePerformance(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    expect(metrics.duration).toBeDefined();
    expect(metrics.duration).toBeGreaterThan(0);
    expect(metrics.duration).toBeLessThan(200);
  });

  it('reports slow operations to Sentry', async () => {
    jest.useFakeTimers();
    
    const slowOperation = async () => {
      await new Promise(resolve => setTimeout(resolve, 4000));
    };
    
    const promise = measurePerformance(slowOperation);
    jest.advanceTimersByTime(4000);
    await promise;
    
    expect(Sentry.captureException).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        extra: expect.objectContaining({
          duration: expect.any(Number)
        })
      })
    );
    
    jest.useRealTimers();
  });
}); 