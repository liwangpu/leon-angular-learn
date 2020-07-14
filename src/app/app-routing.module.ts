import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'custom-data-store',
        loadChildren: () => import('./custom-data-store/custom-data-store.module').then(m => m.CustomDataStoreModule)
    },
    {
        path: 'redux-data-store',
        loadChildren: () => import('./redux-data-store/redux-data-store.module').then(m => m.ReduxDataStoreModule)
    },
    { path: '', pathMatch: 'full', redirectTo: 'custom-data-store' },
    { path: '**', redirectTo: 'custom-data-store' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false, initialNavigation: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
