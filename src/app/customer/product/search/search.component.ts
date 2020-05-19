import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

    constructor(
    ) { }

    ngOnDestroy(): void {
        console.log('search destroy');
    }

    ngOnInit(): void {
        console.log('search init');
    }

    search() {

    }

}
