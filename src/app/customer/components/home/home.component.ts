import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'customer-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges {

    person = { updateTime: 'default time' };
    constructor(
        private cd: ChangeDetectorRef
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('home changes:', changes);
    }

    ngOnInit() {
    }

    infoChange() {
        this.cd.markForCheck();
    }

    updatePerson() {
        this.person.updateTime = Date.now().toString();
    }
}
