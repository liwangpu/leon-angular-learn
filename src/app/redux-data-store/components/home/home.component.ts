import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../../data-store/data-store.service';

@Component({
    selector: 'app-redux-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public constructor(
        private dataStore: DataStoreService
    ) { }

    public ngOnInit(): void {
        this.dataStore.refreshNavigation();
        this.dataStore.refreshFavorite();
    }

}
