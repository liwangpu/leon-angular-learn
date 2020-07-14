import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { IFavorite } from 'src/app/models';
import { SubSink } from 'subsink';
import { DataStoreService } from '../../data-store';

@Component({
  selector: 'app-redux-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit, OnDestroy {

    public favorites: Array<IFavorite>;
    private subs = new SubSink();
    public constructor(
        private dataStore: DataStoreService
    ) { }

    public ngOnInit(): void {
        this.subs.sink = combineLatest([
            this.dataStore.navigation$,
            this.dataStore.favorite$
        ]).subscribe(([navs, favs]) => {
            this.favorites = favs?.filter(f => navs?.some(n => n.id === f.navigationId));
        });
    }

    public ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    public removeFavorite(id: string): void {
        this.dataStore.removeFavorite(id);
    }

    public trackById(item: any): string {
        return item?.id;
    }

}
