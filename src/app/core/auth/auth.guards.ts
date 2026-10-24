import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ROLE_HOME, ROLE_LOGIN, Role, isRole } from '../models/role';
import { AuthStore } from './auth.store';

/**
 * Route guards improve navigation UX. They do not protect data:
 * the ASP.NET Core API must authorize every request independently.
 */

/** Requires an authenticated user whose role equals route.data['role']. */
export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthStore);
  const router = inject(Router);
  const required: unknown = route.data['role'];
  if (!isRole(required)) return router.createUrlTree(['/access-denied']);

  if (!auth.validate()) {
    return router.createUrlTree([ROLE_LOGIN[required]], { queryParams: { returnUrl: state.url } });
  }
  return auth.role() === required ? true : router.createUrlTree(['/access-denied']);
};

/** Login pages: signed-in users go straight to their own workspace. */
export const guestOnlyGuard: CanActivateFn = () => {
  const auth = inject(AuthStore);
  const router = inject(Router);
  const role: Role | null = auth.validate() ? auth.role() : null;
  return role ? router.createUrlTree([ROLE_HOME[role]]) : true;
};
