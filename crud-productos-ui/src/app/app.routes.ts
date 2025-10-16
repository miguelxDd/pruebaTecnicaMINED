import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'productos',
    loadChildren: () => import('./productos/productos.routes').then(r => r.productosRoutes)
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
