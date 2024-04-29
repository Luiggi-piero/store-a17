import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'products', 
        // cargando rutas hijas
        loadChildren: () => import('./features/products/products.routes')
    },
    {
        path: 'checkout', 
        // cargando modulo/componente standalone
        loadComponent: () => import('./features/checkout/checkout.component')
    },
    {
        path: '', redirectTo: 'products', pathMatch: 'full'
    },
    {
        path: '**', redirectTo: 'products', pathMatch: 'full'
    },
];
