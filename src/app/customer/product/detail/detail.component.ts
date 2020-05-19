import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

    key: string;
    constructor(
        private acr: ActivatedRoute,
        private router: Router
    ) {
        // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.acr.paramMap.subscribe(res => {
            // console.log(1, res);
            this.key = res.get('id');
        });
    }
    ngOnDestroy(): void {
        console.log('detail destroy');
    }

    ngOnInit(): void {
        console.log('detail init');
    }

}
