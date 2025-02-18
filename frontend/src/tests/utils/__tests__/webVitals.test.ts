import * as webVitals from 'web-vitals';
import { monitorWebVitals } from '../../../utils/performanceMonitoring';
import { trackEvent } from '../../../utils/analytics';

jest.mock('web-vitals', () => ({
  __esModule: true,
  onCLS: jest.fn(),
  onFID: jest.fn(),
  onLCP: jest.fn()
}));

jest.mock('../../../utils/analytics');
jest.mock('../../../utils/errorTracking');

describe('Web Vitals Monitoring', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('tracks CLS within threshold', () => {
    (webVitals.onCLS as jest.Mock).mockImplementation(cb => cb({ value: 0.05 }));
    monitorWebVitals();
    
    expect(trackEvent).toHaveBeenCalledWith({
      category: 'Web Vitals',
      action: 'CLS',
      value: 0.05
    });
  });
}); 