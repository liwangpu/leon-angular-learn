import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromState from './state';

const selectDataStore = createFeatureSelector<fromState.IDataStore>(fromState.DATASTOREKEY);

export const selectNavigation = createSelector(
    selectDataStore,
    state => state.navigations
);

export const selectFavorite = createSelector(
    selectDataStore,
    state => state.favorites
);