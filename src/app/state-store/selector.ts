import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import * as fromState from './state';

export const selectStoreState: MemoizedSelector<object, fromState.IStoreState, DefaultProjectorFn<fromState.IStoreState>> = createFeatureSelector<fromState.IStoreState>(fromState.stateStoreKey);


export const selectPreviewMode: MemoizedSelector<object, boolean, DefaultProjectorFn<boolean>> = createSelector(
    selectStoreState,
    state => state.preview
);

export const selectScopeData: MemoizedSelector<object, {
    [key: string]: any;
}, DefaultProjectorFn<{
    [key: string]: any;
}>> = createSelector(
    selectStoreState,
    state => state.mirror
);
