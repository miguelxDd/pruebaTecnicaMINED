import { Routes } from '@angular/router';

export const productosRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./producto-list/producto-list.component').then(c => c.ProductoListComponent)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./producto-form/producto-form.component').then(c => c.ProductoFormComponent)
  },
  {
    path: ':id/editar',
    loadComponent: () => import('./producto-form/producto-form.component').then(c => c.ProductoFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./producto-detail/producto-detail.component').then(c => c.ProductoDetailComponent)
  }
];