import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        private acr: ActivatedRoute
    ) {
        // console.log(1, acr);
        this.acr.paramMap.subscribe(res=>{
            console.log(1,res);
        });
    }
}
