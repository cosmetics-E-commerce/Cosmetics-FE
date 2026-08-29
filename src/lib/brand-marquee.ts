const marqueeTiming = {
  SLOW: { secondsPerBrand: 5.2, minimum: 38 },
  NORMAL: { secondsPerBrand: 4, minimum: 30 },
  FAST: { secondsPerBrand: 2.8, minimum: 22 },
  VERY_FAST: { secondsPerBrand: 2, minimum: 16 },
} as const;

export function brandMarqueeDuration(brandCount: number, speed: string | undefined): number {
  const timing =
    speed && speed in marqueeTiming
      ? marqueeTiming[speed as keyof typeof marqueeTiming]
      : marqueeTiming.FAST;
  return Math.max(timing.minimum, brandCount * timing.secondsPerBrand);
}
