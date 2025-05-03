import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = ResizeObserver;

afterEach(() => {
  vi.unstubAllEnvs();
});
