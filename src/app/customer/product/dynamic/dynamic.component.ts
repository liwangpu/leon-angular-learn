import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-dynamic',
    templateUrl: './dynamic.component.html',
    styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit, OnDestroy {

    key: string;
    constructor(
        private acr: ActivatedRoute
    ) {
        this.acr.paramMap.subscribe(res => {
            // console.log(1, res);
            this.key = res.get('key');
        });
    }
    ngOnDestroy(): void {
        console.log('dynamic destroy');
    }

    ngOnInit(): void {
        console.log('dynamic init');
    }

}
