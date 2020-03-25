import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';

@Component({
    selector: 'app-parent',
    templateUrl: './parent.component.html',
    styleUrls: ['./parent.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentComponent implements OnInit, OnChanges {

    @Input()
    person: { updateTime: string };
    constructor(
        private cd: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('parent changes:', changes);
    }

    refresh() {
        this.cd.detectChanges();
    }

    doMarkForCheck() {
        this.cd.markForCheck();
    }
}
