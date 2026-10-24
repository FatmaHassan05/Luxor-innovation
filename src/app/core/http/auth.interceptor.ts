import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthStore } from '../auth/auth.store';
import { ROLE_LOGIN } from '../models/role';

/** Adds the credential to API calls and ends the local session when the API answers 401. */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthStore);
  const router = inject(Router);
  const isApi = req.url.startsWith(environment.apiBaseUrl);
  const token = auth.token();

  const outgoing = isApi && token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(outgoing).pipe(
    catchError((error: unknown) => {
      if (isApi && error instanceof HttpErrorResponse && error.status === 401 && auth.isAuthenticated()) {
        const role = auth.role();
        auth.expire();
        if (role) void router.navigate([ROLE_LOGIN[role]]);
      }
      return throwError(() => error);
    }),
  );
};
