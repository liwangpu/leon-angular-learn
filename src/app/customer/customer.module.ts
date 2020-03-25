import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ParentComponent } from './components/parent/parent.component';
import { ChildComponent } from './components/child/child.component';
import { GrandChildComponent } from './components/grand-child/grand-child.component';

@NgModule({
    declarations: [HomeComponent, ParentComponent, ChildComponent, GrandChildComponent],
    imports: [
        CommonModule,
        CustomerRoutingModule
    ],
    providers: [
    ]
})
export class CustomerModule { }
