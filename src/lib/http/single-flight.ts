export function createSingleFlight<T>(operation: () => Promise<T>): () => Promise<T> {
  let active: Promise<T> | null = null;
  return () => {
    active ??= operation().finally(() => {
      active = null;
    });
    return active;
  };
}
