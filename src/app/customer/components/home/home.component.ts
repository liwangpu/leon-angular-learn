import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'customer-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    constructor() { }

    ngOnDestroy(): void {
        console.log('customer destroy');
    }

    ngOnInit(): void {
        console.log('customer init');
    }

}
