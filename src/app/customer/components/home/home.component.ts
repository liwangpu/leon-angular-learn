import { Component, Injector, OnInit } from '@angular/core';

class DynamicComponent {

    constructor(
        protected injector: Injector
    ) {

    }
}

@Component({
    selector: 'customer-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent extends DynamicComponent implements OnInit {

    public constructor(
        injector: Injector
    ) {
        super(injector);
    }

    public ngOnInit() {
    }

}
