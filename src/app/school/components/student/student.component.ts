import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit, OnChanges {

    @Input()
    prices: Array<number>;
    @Input()
    oddPrices: Array<number>;
    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('student change:', changes);
    }

    ngOnInit(): void {
    }

}
