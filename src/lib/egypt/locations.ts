import { cities, governorates, type City } from 'egydata';

export const egyptGovernorates = governorates.getAll().map((governorate) => ({
  code: governorate.code,
  value: governorate.nameEn === 'Matruh' ? 'Matrouh' : governorate.nameEn,
  label: `${governorate.name} — ${governorate.nameEn}`,
}));

export function locationsForGovernorate(value: string): City[] {
  const governorate = egyptGovernorates.find((entry) => entry.value === value);
  return governorate ? cities.getByGovernorate(governorate.code) : [];
}
