import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Role, SelfRegisterRole } from '../models/role';
import { AuthSession } from '../models/user';
import { AuthApi, AuthError, LoginRequest, RegisterRequest } from './auth.api';

/**
 * ASP.NET Core implementation of AuthApi.
 * ⚠ The endpoint shapes below are a PROPOSED contract and must be aligned with the real API.
 *   POST {api}/auth/{role}/login      -> AuthSession
 *   POST {api}/auth/{role}/register   -> AuthSession   (researcher | company only)
 *   POST {api}/auth/logout            -> 204
 * Authentication and authorization are enforced by the backend; this class only transports credentials.
 */
@Injectable()
export class HttpAuthApi extends AuthApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/auth`;

  override login(role: Role, request: LoginRequest): Observable<AuthSession> {
    return this.http.post<AuthSession>(`${this.base}/${role}/login`, request).pipe(catchError(toAuthError));
  }

  override register(role: SelfRegisterRole, request: RegisterRequest): Observable<AuthSession> {
    return this.http.post<AuthSession>(`${this.base}/${role}/register`, request).pipe(catchError(toAuthError));
  }

  override logout(): Observable<void> {
    return this.http.post<void>(`${this.base}/logout`, {}).pipe(catchError(toAuthError));
  }
}

function toAuthError(error: unknown): Observable<never> {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 400 || error.status === 401 || error.status === 403) {
      return throwError(() => new AuthError('invalid_credentials')); // deliberately generic
    }
    if (error.status === 409) return throwError(() => new AuthError('email_taken'));
  }
  return throwError(() => new AuthError('network'));
}
