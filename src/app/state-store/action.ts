import { createAction, props } from '@ngrx/store';

export const setScopeData: any = createAction('[mirror] set scope data',
    props<{ scope: { [key: string]: any }; key?: string; action?: string }>());

export const resetScopeData: any = createAction('[mirror] reset scope data', props<{ from?: string }>());

