import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { DynamicComponent } from './dynamic/dynamic.component';


@NgModule({
  declarations: [DynamicComponent],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
