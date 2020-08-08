import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MirrorRoutingModule } from './mirror-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [LoginComponent, HomeComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MirrorRoutingModule
    ]
})
export class MirrorModule { }
