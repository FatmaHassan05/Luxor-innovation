/**
 * Production environment.
 * ⚠ useMocks is TRUE only so the GitHub Pages demo link works without a backend.
 * Before connecting the real ASP.NET Core API, set it to false.
 */
export const environment = {
  production: true,
  useMocks: true,
  apiBaseUrl: '/api',
};
