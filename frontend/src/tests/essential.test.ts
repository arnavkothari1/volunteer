import { trackCriticalOperation } from '../utils/essentialMetrics';

describe('Essential Tests', () => {
  it('tracks slow operations', async () => {
    const slowOperation = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return 'result';
    };

    const result = await trackCriticalOperation('test', slowOperation);
    expect(result).toBe('result');
  });
}); 