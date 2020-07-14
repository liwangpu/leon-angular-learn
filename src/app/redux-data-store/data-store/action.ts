import { createAction, props } from '@ngrx/store';
import { IFavorite, INavigation } from 'src/app/models';

export const refreshNavigation = createAction('[data store] refresh navigation');
export const refreshFavorite = createAction('[data store] refresh favorite');
export const setNavigations = createAction('[data store] set navigations', props<{ navigations: Array<INavigation> }>());
export const setFavorites = createAction('[data store] set favorites', props<{ favorites: Array<IFavorite> }>());
export const addNavigation = createAction('[data store] add navigation', props<{ navigation: INavigation }>());
export const removeNavigation = createAction('[data store] remove navigation', props<{ id: string }>());
export const addFavorite = createAction('[data store] add favorite', props<{ favorite: IFavorite }>());
export const removeFavorite = createAction('[data store] remove favorite', props<{ id: string }>());