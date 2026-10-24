import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', loadComponent: () => import('./features/public/home.page').then((m) => m.HomePage) },
      { path: 'access-denied', loadComponent: () => import('./features/public/access-denied.page').then((m) => m.AccessDeniedPage) },
    ],
  },
  { path: 'researcher', loadChildren: () => import('./features/researcher/researcher.routes').then((m) => m.RESEARCHER_ROUTES) },
  { path: 'company', loadChildren: () => import('./features/company/company.routes').then((m) => m.COMPANY_ROUTES) },
  { path: 'judge', loadChildren: () => import('./features/judge/judge.routes').then((m) => m.JUDGE_ROUTES) },
  { path: 'admin', loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES) },
  {
    path: '**',
    component: PublicLayoutComponent,
    children: [{ path: '', loadComponent: () => import('./features/public/not-found.page').then((m) => m.NotFoundPage) }],
  },
];
