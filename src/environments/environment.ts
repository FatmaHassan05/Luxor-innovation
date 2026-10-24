/**
 * Development environment.
 * `useMocks: true` swaps every API abstraction for its in-memory mock.
 * Mocks are for demonstration only: they provide NO real authentication,
 * authorization, persistence or file storage.
 */
export const environment = {
  production: false,
  useMocks: true,
  apiBaseUrl: '/api',
};
