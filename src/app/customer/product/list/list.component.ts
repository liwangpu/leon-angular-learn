import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

    constructor() { }

    ngOnDestroy(): void {
        console.log('list destroy');
    }

    ngOnInit(): void {
        console.log('list init');
    }

}
