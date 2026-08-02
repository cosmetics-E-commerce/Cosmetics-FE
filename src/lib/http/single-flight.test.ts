import { describe, expect, it, vi } from 'vitest';

import { createSingleFlight } from './single-flight';

describe('createSingleFlight', () => {
  it('shares one refresh operation across concurrent callers and resets afterward', async () => {
    const operation = vi.fn(async () => 'session');
    const run = createSingleFlight(operation);

    await expect(Promise.all([run(), run(), run()])).resolves.toEqual([
      'session',
      'session',
      'session',
    ]);
    expect(operation).toHaveBeenCalledTimes(1);

    await expect(run()).resolves.toBe('session');
    expect(operation).toHaveBeenCalledTimes(2);
  });
});
