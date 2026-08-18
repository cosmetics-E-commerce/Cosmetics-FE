/**
 * Generates an RFC 4122 v4 identifier in HTTPS, SSR, and local-network HTTP
 * contexts. `crypto.randomUUID()` is secure-context-only in some mobile
 * browsers, while `getRandomValues()` remains available for LAN development.
 */
export function randomUuid() {
  const cryptoApi = globalThis.crypto;
  if (typeof cryptoApi?.randomUUID === "function") return cryptoApi.randomUUID();

  if (typeof cryptoApi?.getRandomValues === "function") {
    const bytes = cryptoApi.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6]! & 0x0f) | 0x40;
    bytes[8] = (bytes[8]! & 0x3f) | 0x80;
    const value = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
    return `${value.slice(0, 8)}-${value.slice(8, 12)}-${value.slice(12, 16)}-${value.slice(16, 20)}-${value.slice(20)}`;
  }

  // Extremely old webviews may expose neither API. This keeps non-sensitive
  // client correlation IDs functional; authentication tokens are not created
  // by this helper.
  const seed = `${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`.padEnd(32, "0");
  return `${seed.slice(0, 8)}-${seed.slice(8, 12)}-4${seed.slice(13, 16)}-8${seed.slice(17, 20)}-${seed.slice(20, 32)}`;
}
