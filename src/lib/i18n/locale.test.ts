import { describe, expect, it } from 'vitest';

import { directionFor, resolveLocale } from './locale';

describe('storefront locale boundary', () => {
  it('uses Arabic/RTL by default and supports English/LTR explicitly', () => {
    expect(resolveLocale(undefined)).toBe('ar');
    expect(directionFor(resolveLocale(undefined))).toBe('rtl');
    expect(directionFor(resolveLocale('en'))).toBe('ltr');
  });
});
