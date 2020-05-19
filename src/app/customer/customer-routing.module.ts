import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'product',
                loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
            }
        ]
    },
    // { path: '', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
