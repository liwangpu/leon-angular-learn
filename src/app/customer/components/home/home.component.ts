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

        if (!this.functionBody) {
            this.functionBody = `console.log('you pass me name:',this.name);return this.name+",a cool boy!"`;
            localStorage.setItem('functionBody', this.functionBody);
        }
    }

    runCode() {
        localStorage.setItem('functionBody', this.functionBody);
        let _fun = new Function(this.functionBody);
        let fun = _fun.bind(this);
        let res = fun();
        console.log('函数返回值:',res);
    }

}
