import { Routes } from '@angular/router';
import { AuthGuard } from './core';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth').then(m => m.authRoutes)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard').then(m => m.dashboardRoutes),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/auth/login' }
];
