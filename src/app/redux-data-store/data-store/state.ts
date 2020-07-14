import { IFavorite, INavigation } from 'src/app/models';

export const DATASTOREKEY = 'dataStore';

export interface IDataStore {
    navigations?: Array<INavigation>;
    favorites?: Array<IFavorite>;
}