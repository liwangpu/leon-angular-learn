import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDataStoreRoutingModule } from './custom-data-store-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { DataStoreService } from './services/data-store.service';

@NgModule({
    declarations: [HomeComponent, NavigationComponent, FavoriteComponent],
    imports: [
        CommonModule,
        CustomDataStoreRoutingModule
    ],
    providers: [
        DataStoreService
    ]
})
export class CustomDataStoreModule { }
