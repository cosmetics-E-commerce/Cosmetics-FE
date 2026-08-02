import { describe, expect, it } from 'vitest';

import { egyptGovernorates, locationsForGovernorate } from './locations';

describe('Egypt location data', () => {
  it('provides the complete governorate catalogue', () => {
    expect(egyptGovernorates).toHaveLength(27);
    expect(egyptGovernorates.some((entry) => entry.value === 'Cairo')).toBe(true);
  });

  it('maps the Matruh package spelling to the backend shipping-zone spelling', () => {
    expect(egyptGovernorates.some((entry) => entry.value === 'Matrouh')).toBe(true);
    expect(locationsForGovernorate('Matrouh').length).toBeGreaterThan(0);
  });

  it('only returns cities and districts belonging to the selected governorate', () => {
    const cairo = locationsForGovernorate('Cairo');
    expect(cairo.some((entry) => entry.nameEn === 'New Cairo')).toBe(true);
    expect(cairo.some((entry) => entry.nameEn === 'Alexandria')).toBe(false);
  });
});
