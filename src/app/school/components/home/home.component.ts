import { Component, OnInit, NgModule, NgModuleRef, Injector, Compiler, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'school-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    htmlStr: string;
    styleStr: string;
    @ViewChild('vc', { read: ViewContainerRef })
    vc: ViewContainerRef;
    cmpRef: ComponentRef<any>;
    constructor(
        private compiler: Compiler,
        private injector: Injector,
        private moduleRef: NgModuleRef<any>,
    ) {
        this.htmlStr = localStorage.getItem('htmlStr');
        this.styleStr = localStorage.getItem('styleStr');
        if (!this.htmlStr) {
            this.htmlStr = `<p class="name">姓名:{{data.name}}</p><p>年纪:{{data.age}}</p><p *ngFor="let it of data.arrs">{{it}}</p>`;
            localStorage.setItem('htmlStr', this.htmlStr);
        }
        if (!this.styleStr) {
            this.styleStr = `p.name{color:orange;}`;
            localStorage.setItem('styleStr', this.styleStr);
        }

    }

    ngOnInit() {
    }

    generateDyc() {
        this.createComponentFromRaw(this.htmlStr);
        // this.createComponentFromRaw(`<div style="border: 1px solid blue; margin: 5px; padding: 5px">
        // <div>Start Raw Component ... </div> 
        // <hello></hello>
        // <h5>Binding value: {{data.some}}</h5> 
        // <span *ngIf="getX() === 'X'">Use *ngIf: {{getX()}} </span>
        // </div>`);
    }

    private createComponentFromRaw(template: string) {
        // Let's say your template looks like `<h2><some-component [data]="data"></some-component>`
        // As you see, it has an (existing) angular component `some-component` and it injects it [data]

        // Now we create a new component. It has that template, and we can even give it data.
        const styles = [];
        function TmpCmpConstructor() {
            // this.data = { some: 'data' };
            // this.getX = () => 'X';
            this.data = { name: 'Leon', age: 18, arrs: [1, 2, 3] };

        }
        const tmpCmp = Component({ template, styles: [this.styleStr] })(new TmpCmpConstructor().constructor);

        // Now, also create a dynamic module.
        const tmpModule = NgModule({
            imports: [CommonModule],
            declarations: [tmpCmp],
            // providers: [] - e.g. if your dynamic component needs any service, provide it here.
        })(class { });

        // Now compile this module and component, and inject it into that #vc in your current component template.
        this.compiler.compileModuleAndAllComponentsAsync(tmpModule)
            .then((factories) => {
                const f = factories.componentFactories[0];
                this.cmpRef = f.create(this.injector, [], null, this.moduleRef);
                // this.cmpRef.instance.name = 'my-dynamic-component';
                this.vc.insert(this.cmpRef.hostView);
            });
    }

}
