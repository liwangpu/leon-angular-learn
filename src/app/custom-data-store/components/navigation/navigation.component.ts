import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { INavigation } from 'src/app/models';
import { SubSink } from 'subsink';
import { DataStoreService } from '../../services/data-store.service';

@Component({
    selector: 'app-custom-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

    public navigations: Array<INavigation>;
    private subs = new SubSink();
    public constructor(
        private dataStore: DataStoreService
    ) { }

    public ngOnInit(): void {
        this.subs.sink = combineLatest([
            this.dataStore.navigation$,
            this.dataStore.favorite$
        ]).subscribe(([navs, favs]) => {
            navs?.forEach(nav => {
                nav['@favorite'] = favs.filter(f => f.navigationId === nav.id)[0];
            });

            this.navigations = navs;
        });
    }

    public ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    public toggleFavorite(nav: INavigation): void {
        if (nav['@favorite']) {
            this.dataStore.removeFavorite(nav['@favorite'].id);
        } else {
            this.dataStore.addFavorite({ name: nav.name, navigationId: nav.id });
        }
    }

    public addNavigation(name: string) {
        this.dataStore.addNavigation({ name });
    }

    public removeNavigation(id: string): void {
        this.dataStore.removeNavigation(id);
    }

    public trackById(item: any): string {
        return item?.id;
    }


}
