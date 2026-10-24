import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Role, SelfRegisterRole } from '../models/role';
import { AuthSession } from '../models/user';
import { AuthApi, LoginRequest, RegisterRequest } from './auth.api';

const SESSION_KEY = 'lx.session';

/**
 * Client-side session state (signals). It drives navigation and guards for UX only.
 * It is NOT a security boundary: every protected resource must be authorized by the backend.
 */
@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly api = inject(AuthApi);

  private readonly session = signal<AuthSession | null>(this.restore());

  readonly user = computed(() => this.session()?.user ?? null);
  readonly role = computed<Role | null>(() => this.user()?.role ?? null);
  readonly token = computed(() => this.session()?.token ?? null);
  readonly isAuthenticated = computed(() => this.session() !== null);

  /** True when the last session ended by timeout/401; the login page shows an explanation once. */
  readonly sessionExpired = signal(false);

  login(role: Role, request: LoginRequest): Observable<AuthSession> {
    return this.api.login(role, request).pipe(tap((s) => this.start(s)));
  }

  register(role: SelfRegisterRole, request: RegisterRequest): Observable<AuthSession> {
    return this.api.register(role, request).pipe(tap((s) => this.start(s)));
  }

  logout(): void {
    this.clear();
    this.sessionExpired.set(false);
    this.api.logout().subscribe({ error: () => undefined }); // best effort; local state is already cleared
  }

  /** Called by the interceptor on 401. */
  expire(): void {
    this.clear();
    this.sessionExpired.set(true);
  }

  /** Returns true if a non-expired session exists; clears it otherwise. */
  validate(): boolean {
    const s = this.session();
    if (!s) return false;
    if (s.expiresAt <= Date.now()) {
      this.expire();
      return false;
    }
    return true;
  }

  private start(session: AuthSession): void {
    this.sessionExpired.set(false);
    this.session.set(session);
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {
      /* session lasts for this page load only */
    }
  }

  private clear(): void {
    this.session.set(null);
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
  }

  private restore(): AuthSession | null {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as AuthSession;
      return parsed.expiresAt > Date.now() ? parsed : null;
    } catch {
      return null;
    }
  }
}
