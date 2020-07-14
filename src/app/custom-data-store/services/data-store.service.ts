import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IFavorite, INavigation } from 'src/app/models';
import { FavoriteService, NavigationService } from 'src/app/services';

@Injectable()
export class DataStoreService implements OnDestroy {

    private _navigation$ = new BehaviorSubject<Array<INavigation>>([]);
    private _favorite$ = new BehaviorSubject<Array<IFavorite>>([]);
    public constructor(
        private navigationSrv: NavigationService,
        private favoriteSrv: FavoriteService
    ) { }

    public ngOnDestroy(): void {
        this._favorite$.complete();
        this._favorite$.unsubscribe();
        this._navigation$.complete();
        this._navigation$.unsubscribe();
    }

    public get navigation$(): Observable<Array<INavigation>> {
        return this._navigation$.asObservable();
    }

    public get favorite$(): Observable<Array<IFavorite>> {
        return this._favorite$.asObservable();
    }

    public refreshNavigation(): void {
        this.navigationSrv.query().subscribe(navs => this._navigation$.next(navs));
    }

    public addNavigation(nav: INavigation): void {
        this.navigationSrv.create(nav)
            .subscribe(() => this.refreshNavigation());
    }

    public removeNavigation(id: string): void {
        this.navigationSrv.delete(id)
            .subscribe(() => this.refreshNavigation());
    }

    public refreshFavorite(): void {
        this.favoriteSrv.query()
            .subscribe(favs => this._favorite$.next(favs));
    }

    public addFavorite(fav: IFavorite): void {
        this.favoriteSrv.create(fav)
            .subscribe(() => this.refreshFavorite());
    }

    public removeFavorite(id: string): void {
        this.favoriteSrv.delete(id)
            .subscribe(() => this.refreshFavorite());
    }

}
