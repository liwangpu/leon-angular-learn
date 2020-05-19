import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { DynamicComponent } from './dynamic/dynamic.component';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategyService } from 'src/app/custom-route-reuse-strategy.service';


@NgModule({
    declarations: [DynamicComponent, SearchComponent, ListComponent, DetailComponent],
    imports: [
        CommonModule,
        ProductRoutingModule
    ],
    providers: [
        // {
        //     provide: RouteReuseStrategy,
        //     useClass: CustomRouteReuseStrategyService
        // }
    ]
})
export class ProductModule { }
