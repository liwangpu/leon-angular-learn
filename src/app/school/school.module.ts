import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolRoutingModule } from './school-routing.module';
import { HomeComponent } from './components/home/home.component';
import { DycContainerComponent } from './dyc-container/dyc-container.component';

@NgModule({
    declarations: [HomeComponent, DycContainerComponent],
    imports: [
        CommonModule,
        SchoolRoutingModule,
        FormsModule
    ]
})
export class SchoolModule { }
