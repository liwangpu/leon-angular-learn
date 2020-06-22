import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'customer-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    name = 'Leon';
    functionBody: string;
    constructor() { }

    ngOnInit() {
        this.functionBody = localStorage.getItem('functionBody');
    }

    runCode() {
        localStorage.setItem('functionBody', this.functionBody);
        let _fun = new Function(this.functionBody);
        let fun = _fun.bind(this);
        fun();
    }

}
