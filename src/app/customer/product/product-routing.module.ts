import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicComponent } from './dynamic/dynamic.component';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';


const routes: Routes = [
    {
        path: 'dynamic/:key',
        component: DynamicComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'list',
        component: ListComponent
    },
    {
        path: 'detail/:id',
        component: DetailComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }
