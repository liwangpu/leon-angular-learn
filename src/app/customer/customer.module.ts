import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { HomeComponent } from './components/home/home.component';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        FormsModule
    ],
    providers: [
    ]
})
export class CustomerModule { }
