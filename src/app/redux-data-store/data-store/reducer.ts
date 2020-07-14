import { state } from '@angular/animations';
import { createReducer, Action, on } from '@ngrx/store';
import * as fromAction from './action';
import * as fromState from './state';


export const _reducer = createReducer(
    { navigations: [], favorites: [] },
    on(fromAction.setNavigations, (state: fromState.IDataStore, { navigations }) => {
        return { ...state, navigations };
    }),
    on(fromAction.setFavorites, (state: fromState.IDataStore, { favorites }) => {
        return { ...state, favorites };
    }),
    // on(fromAction.addNavigation, (state: fromState.IDataStore, { navigation }) => {
    //     let navs = [...state.navigations];
    //     navs.push(navigation);
    //     return { ...state, navigations: navs };
    // })
);

export function reducer(state: any, action: Action) {
    return _reducer(state, action);
}