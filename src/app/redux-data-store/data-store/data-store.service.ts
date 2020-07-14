import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IFavorite, INavigation } from 'src/app/models';
import * as fromAction from './action';
import * as fromSelector from './selector';
import * as fromState from './state';

@Injectable()
export class DataStoreService {

    public constructor(
        private store: Store<fromState.IDataStore>,
    ) { }

    public get navigation$(): Observable<Array<INavigation>> {
        return this.store.select(fromSelector.selectNavigation);
    }

    public get favorite$(): Observable<Array<IFavorite>> {
        return this.store.select(fromSelector.selectFavorite);
    }

    public refreshNavigation(): void {
        this.store.dispatch(fromAction.refreshNavigation());
    }

    public addNavigation(nav: INavigation): void {
        this.store.dispatch(fromAction.addNavigation({ navigation: nav }));
    }

    public removeNavigation(id: string): void {
        this.store.dispatch(fromAction.removeNavigation({ id }));
    }

    public refreshFavorite(): void {
        this.store.dispatch(fromAction.refreshFavorite());
    }

    public addFavorite(fav: IFavorite): void {
        this.store.dispatch(fromAction.addFavorite({ favorite: fav }));
    }

    public removeFavorite(id: string): void {
        this.store.dispatch(fromAction.removeFavorite({ id }));
    }
}
