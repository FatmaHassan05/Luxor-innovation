import { Injectable } from '@angular/core';
import { Observable, defer, of, switchMap, throwError, timer } from 'rxjs';
import { Role, SelfRegisterRole } from '../models/role';
import { AuthSession, User } from '../models/user';
import { AuthApi, AuthError, LoginRequest, RegisterRequest } from './auth.api';

/*
 * ⚠ DEMONSTRATION ONLY ⚠
 * Credentials live in client code and in localStorage. There is no hashing, no server,
 * no real session and no authorization. Never ship this with useMocks=true.
 */

interface MockUser extends User {
  password: string;
}

export const DEMO_ACCOUNTS: Record<Role, { email: string; password: string; displayName: string }> = {
  researcher: { email: 'researcher@demo.luxor.test', password: 'Demo#1234', displayName: 'Demo Researcher' },
  company: { email: 'company@demo.luxor.test', password: 'Demo#1234', displayName: 'Demo Company' },
  judge: { email: 'judge@demo.luxor.test', password: 'Demo#1234', displayName: 'Demo Viewer / Judge' },
  admin: { email: 'admin@demo.luxor.test', password: 'Demo#1234', displayName: 'Demo Administrator' },
};

const USERS_KEY = 'lx.mock.users';
const LATENCY_MS = 450;
const SESSION_TTL_MS = 2 * 60 * 60 * 1000;

@Injectable()
export class MockAuthApi extends AuthApi {
  private readonly seeded: MockUser[] = (Object.keys(DEMO_ACCOUNTS) as Role[]).map((role) => ({
    id: `demo-${role}`,
    role,
    ...DEMO_ACCOUNTS[role],
  }));

  override login(role: Role, request: LoginRequest): Observable<AuthSession> {
    return this.simulate(() => {
      const email = request.email.trim().toLowerCase();
      const user = this.allUsers().find(
        (u) => u.role === role && u.email.toLowerCase() === email && u.password === request.password,
      );
      return user ? of(this.toSession(user)) : throwError(() => new AuthError('invalid_credentials'));
    });
  }

  override register(role: SelfRegisterRole, request: RegisterRequest): Observable<AuthSession> {
    return this.simulate(() => {
      const email = request.email.trim().toLowerCase();
      if (this.allUsers().some((u) => u.email.toLowerCase() === email)) {
        return throwError(() => new AuthError('email_taken'));
      }
      const user: MockUser = {
        id: `mock-${Date.now()}`,
        role,
        displayName: request.displayName.trim(),
        email,
        password: request.password,
      };
      this.saveRegistered([...this.loadRegistered(), user]);
      return of(this.toSession(user)); // immediate activation (scope §2)
    });
  }

  override logout(): Observable<void> {
    return of(undefined);
  }

  private simulate<T>(work: () => Observable<T>): Observable<T> {
    return timer(LATENCY_MS).pipe(switchMap(() => defer(work)));
  }

  private toSession(u: MockUser): AuthSession {
    return {
      user: { id: u.id, displayName: u.displayName, email: u.email, role: u.role },
      token: `mock-token-${u.id}`,
      expiresAt: Date.now() + SESSION_TTL_MS,
    };
  }

  private allUsers(): MockUser[] {
    return [...this.seeded, ...this.loadRegistered()];
  }

  private loadRegistered(): MockUser[] {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]') as MockUser[];
    } catch {
      return [];
    }
  }

  private saveRegistered(users: MockUser[]): void {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch {
      /* ignore: mock registration simply will not persist */
    }
  }
}
