import { ActionReducer, createReducer, on } from '@ngrx/store';
import * as fromAction from './action';
import * as fromState from './state';

function getScopeData(state: fromState.IStoreState, key: string): { [key: string]: any } {
    return { ...state.mirror[key] };
}

function updateScopeData(state: fromState.IStoreState, scope: {}, key: string, action?: string): { [key: string]: any } {
    let componentScopeData: { [key: string]: any } = getScopeData(state, key);
    if (action) {
        return { ...componentScopeData, [action]: scope };
    }

    if (typeof scope === 'object' && !Array.isArray(scope)) {
        return { ...componentScopeData, ...scope };
    }
    return { ...componentScopeData };
}

export const stateReducer: ActionReducer<fromState.IStoreState> = createReducer({},
    on(fromAction.setScopeData, (state: fromState.IStoreState, { key, action, scope }) => {
        if (!key) {
            return { ...state, mirror: { ...state.mirror, ...scope } };
        }
        return { ...state, mirror: { ...state.mirror, [key]: updateScopeData(state, scope, key, action) } };
    }),
    on(fromAction.resetScopeData, (state: fromState.IStoreState) => ({ ...state, mirror: {} }))
);
