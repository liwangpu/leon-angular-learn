import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'school-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    flag = 0;
    prices: Array<number> = [];
    // oddPrices: Array<number>;
    get oddPrices(): Array<number> {
        return this.prices.filter(x => x % 2 == 0);
    }
    constructor() { }

    ngOnInit() {
    }

    addPrice() {
        this.flag += 1;
        this.prices.push(this.flag);
        console.log(1, this.prices);
    }

}
