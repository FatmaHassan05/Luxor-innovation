import { Routes } from '@angular/router';
import { guestOnlyGuard, roleGuard } from '../../core/auth/auth.guards';

export const JUDGE_ROUTES: Routes = [
  {
    path: 'login',
    canActivate: [guestOnlyGuard],
    data: { role: 'judge' },
    loadComponent: () => import('../auth/login.page').then((m) => m.LoginPage),
  },
  {
    path: '',
    canActivate: [roleGuard],
    data: { role: 'judge' },
    loadComponent: () => import('../../layouts/workspace-layout.component').then((m) => m.WorkspaceLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'matching' },
      {
        path: 'matching',
        loadComponent: () => import('../workspace/role-home.page').then((m) => m.RoleHomePage),
      },
    ],
  },
];
