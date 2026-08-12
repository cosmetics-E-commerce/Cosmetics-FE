import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";

function createMemoryStorage(): Storage {
  const values = new Map<string, string>();

  return {
    get length() {
      return values.size;
    },
    clear: () => values.clear(),
    getItem: (key) => values.get(String(key)) ?? null,
    key: (index) => Array.from(values.keys())[index] ?? null,
    removeItem: (key) => {
      values.delete(String(key));
    },
    setItem: (key, value) => {
      values.set(String(key), String(value));
    },
  };
}

function ensureStorage(name: "localStorage" | "sessionStorage") {
  const storage = window[name];
  const hasStorageApi =
    storage &&
    typeof storage.clear === "function" &&
    typeof storage.getItem === "function" &&
    typeof storage.key === "function" &&
    typeof storage.removeItem === "function" &&
    typeof storage.setItem === "function";

  if (hasStorageApi) return;
  Object.defineProperty(window, name, {
    configurable: true,
    value: createMemoryStorage(),
  });
}

beforeEach(() => {
  ensureStorage("localStorage");
  ensureStorage("sessionStorage");
});

afterEach(() => cleanup());
