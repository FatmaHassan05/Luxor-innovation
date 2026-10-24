import { Routes } from '@angular/router';
import { guestOnlyGuard, roleGuard } from '../../core/auth/auth.guards';

export const COMPANY_ROUTES: Routes = [
  {
    path: 'login',
    canActivate: [guestOnlyGuard],
    data: { role: 'company' },
    loadComponent: () => import('../auth/login.page').then((m) => m.LoginPage),
  },
  {
    path: '',
    canActivate: [roleGuard],
    data: { role: 'company' },
    loadComponent: () => import('../../layouts/workspace-layout.component').then((m) => m.WorkspaceLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'submissions' },
      {
        path: 'submissions',
        loadComponent: () => import('../workspace/role-home.page').then((m) => m.RoleHomePage),
      },
    ],
  },
];
