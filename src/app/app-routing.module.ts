import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'mirror',
        loadChildren: () => import('./mirror/mirror.module').then(m => m.MirrorModule)
    },
    { path: '', pathMatch: 'full', redirectTo: 'mirror' },
    { path: '**', redirectTo: 'mirror' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false, initialNavigation: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
