import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { CustomerRoutingModule } from './customer-routing.module';
import { HomeComponent } from './components/home/home.component';
import { UserService } from './services/user.service';
import { StateStoreModule } from '../state-store';
import { ContainerComponent } from './components/container/container.component';

@NgModule({
    declarations: [HomeComponent, ContainerComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CustomerRoutingModule,
        StateStoreModule
    ],
    providers: [
        UserService
    ]
})
export class CustomerModule { }
