import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    constructor() {

    }

    ngOnDestroy(): void {
        console.log('app destroy');
    }

    ngOnInit(): void {
        console.log('app init');
    }
}
