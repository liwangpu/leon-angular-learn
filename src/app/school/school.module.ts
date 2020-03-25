import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { HomeComponent } from './components/home/home.component';
import { StudentComponent } from './components/student/student.component';


@NgModule({
  declarations: [HomeComponent, StudentComponent],
  imports: [
    CommonModule,
    SchoolRoutingModule
  ]
})
export class SchoolModule { }
