import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
    },
    {
        path: 'school',
        loadChildren: () => import('./school/school.module').then(m => m.SchoolModule)
    },
    { path: '', pathMatch: 'full', redirectTo: 'customer' },
    { path: '**', redirectTo: 'customer' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false, initialNavigation: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
