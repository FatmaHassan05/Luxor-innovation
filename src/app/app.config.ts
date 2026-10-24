import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { environment } from '../environments/environment';
import { AuthApi } from './core/auth/auth.api';
import { HttpAuthApi } from './core/auth/http-auth.api';
import { MockAuthApi } from './core/auth/mock-auth.api';
import { authInterceptor } from './core/http/auth.interceptor';
import { routes } from './app.routes';
import { LuxorPreset } from './luxor-theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: { preset: LuxorPreset, options: { darkModeSelector: '.lx-dark-never' } },
      ripple: false,
    }),
    // Swap point: mock (demo only) vs the real ASP.NET Core API.
    { provide: AuthApi, useClass: environment.useMocks ? MockAuthApi : HttpAuthApi },
  ],
};
