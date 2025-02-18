import { trackRenderTime, trackAPICall } from '../../../utils/performanceMetrics';
import { trackEvent } from '../../../utils/analytics';
import { captureError } from '../../../utils/errorTracking';

jest.mock('../../../utils/analytics');
jest.mock('../../../utils/errorTracking');

describe('Performance Metrics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('trackRenderTime', () => {
    it('tracks slow renders', () => {
      const startTime = performance.now() - 150; // Simulate 150ms render
      trackRenderTime('TestComponent', startTime);

      expect(trackEvent).toHaveBeenCalledWith({
        category: 'Performance',
        action: 'SlowRender',
        label: 'TestComponent',
        value: expect.any(Number)
      });
    });

    it('ignores fast renders', () => {
      const startTime = performance.now() - 50; // Simulate 50ms render
      trackRenderTime('TestComponent', startTime);

      expect(trackEvent).not.toHaveBeenCalled();
    });
  });

  describe('trackAPICall', () => {
    it('tracks successful API calls', async () => {
      const mockAPI = jest.fn().mockResolvedValue({ data: 'test' });
      
      await trackAPICall('/api/test', mockAPI);

      expect(trackEvent).toHaveBeenCalledWith({
        category: 'API',
        action: '/api/test',
        value: expect.any(Number)
      });
    });

    it('tracks failed API calls', async () => {
      const error = new Error('API Error');
      const mockAPI = jest.fn().mockRejectedValue(error);

      await expect(trackAPICall('/api/test', mockAPI)).rejects.toThrow();

      expect(captureError).toHaveBeenCalledWith(error, {
        endpoint: '/api/test',
        duration: expect.any(Number)
      });
    });
  });
}); 