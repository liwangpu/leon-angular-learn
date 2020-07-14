import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReduxDataStoreRoutingModule } from './redux-data-store-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DataStoreModule } from './data-store';

@NgModule({
    declarations: [HomeComponent, FavoriteComponent, NavigationComponent],
    imports: [
        CommonModule,
        ReduxDataStoreRoutingModule,
        DataStoreModule
    ]
})
export class ReduxDataStoreModule { }
