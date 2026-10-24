import { Observable } from 'rxjs';
import { Role, SelfRegisterRole } from '../models/role';
import { AuthSession } from '../models/user';

export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Minimal registration payload. The exact researcher/company registration fields
 * are defined in Phase 2 against the project scope PDF.
 */
export interface RegisterRequest {
  displayName: string;
  email: string;
  password: string;
}

export type AuthErrorCode = 'invalid_credentials' | 'email_taken' | 'network';

export class AuthError extends Error {
  constructor(readonly code: AuthErrorCode) {
    super(code);
    this.name = 'AuthError';
  }
}

/**
 * Contract between the UI and the authentication backend.
 * `MockAuthApi` (demo only) and `HttpAuthApi` (ASP.NET Core) both implement it;
 * the active one is chosen in app.config.ts from `environment.useMocks`.
 *
 * Login failures MUST use `invalid_credentials` for every credential problem so the UI
 * never reveals whether the email or the password was wrong.
 */
export abstract class AuthApi {
  abstract login(role: Role, request: LoginRequest): Observable<AuthSession>;
  abstract register(role: SelfRegisterRole, request: RegisterRequest): Observable<AuthSession>;
  abstract logout(): Observable<void>;
}
