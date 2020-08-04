import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { stateReducer } from './reducer';
import { stateStoreKey } from './state';
import { StateStoreService } from './state-store.service';

@NgModule({
    imports: [
        StoreModule.forFeature(stateStoreKey, stateReducer),
    ],
    providers: [
        StateStoreService
    ]
})
export class StateStoreModule { }
