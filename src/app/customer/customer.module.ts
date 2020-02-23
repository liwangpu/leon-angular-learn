import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { HomeComponent } from './components/home/home.component';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        CustomerRoutingModule
    ],
    providers: [
    ]
})
export class CustomerModule { }
