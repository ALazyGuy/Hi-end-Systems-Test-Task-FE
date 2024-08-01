import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
    {path: 'actions', loadChildren: () => import('./actions/actions.module').then(m => m.ActionsModule)},
    {path: '**', redirectTo: '/actions/home'}
];
