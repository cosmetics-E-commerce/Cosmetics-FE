export function normalizeEgyptPhone(value: string) {
  const compact = value.replace(/[\s()-]/g, "");
  if (compact.startsWith("+20")) return `0${compact.slice(3)}`;
  if (compact.startsWith("0020")) return `0${compact.slice(4)}`;
  return compact;
}
