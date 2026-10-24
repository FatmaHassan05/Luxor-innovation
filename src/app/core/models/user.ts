import { Role } from './role';

export interface User {
  id: string;
  displayName: string;
  email: string;
  role: Role;
}

export interface AuthSession {
  user: User;
  /** Opaque credential. With a real backend prefer an HttpOnly cookie over a JS-readable token. */
  token: string;
  /** Epoch milliseconds. */
  expiresAt: number;
}
