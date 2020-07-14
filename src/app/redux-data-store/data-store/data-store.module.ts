import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DataStoreService } from './data-store.service';
import { FavoriteEffectService } from './favorite-effect.service';
import { NavigationEffectService } from './navigation-effect.service';
import { reducer } from './reducer';
import { DATASTOREKEY } from './state';

@NgModule({
    imports: [
        StoreModule.forFeature(DATASTOREKEY, reducer),
        EffectsModule.forFeature([NavigationEffectService, FavoriteEffectService])
    ],
    providers: [
        DataStoreService,
        NavigationEffectService,
        FavoriteEffectService
    ]
})
export class DataStoreModule { }
