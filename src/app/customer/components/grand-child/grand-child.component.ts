import { Component, OnInit, Input, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-grand-child',
    templateUrl: './grand-child.component.html',
    styleUrls: ['./grand-child.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GrandChildComponent implements OnInit {

    @Input()
    person: { updateTime: string };
    constructor(
        private cd: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('grand child changes:', changes);
    }

    refresh() {
        this.cd.detectChanges();
    }

    doMarkForCheck() {
        this.cd.markForCheck();
    }

}
