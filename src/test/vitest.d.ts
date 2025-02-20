import '@testing-library/jest-dom'

declare module 'vitest' {
  interface Assertion<T = unknown> extends jest.Matchers<void, T> {
    toBeInTheDocument(): void;
  }
} 