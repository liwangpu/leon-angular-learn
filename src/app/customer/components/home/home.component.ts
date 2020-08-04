import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StateStoreService } from 'src/app/state-store';
import 'reflect-metadata';


class DynamicComponent {

    public key: string = 'userMessage';
    constructor(
        protected injector: Injector
    ) {
        const keys: Array<any> = Reflect.getMetadataKeys(this);
        keys.forEach(k => {
            // tslint:disable-next-line: no-dead-store
            let md: any = Reflect.getMetadata(k, this);
            console.log(1, md);
        });
        console.log(1, keys);

    }

    private get stateStore(): StateStoreService {
        return this.injector.get(StateStoreService);
    }

    private setScope(data: { [key: string]: any }, action: string): void {
        this.stateStore.setScopeData(data, this.key, action);
    }
}

export function GetScope(path?: string) {

    return function (target: object, propertyName: string): any {
        Reflect.defineMetadata(path, { type: 'get value' }, target);
    };
}

export function SetScope(dataName?: string): Function {
    // tslint:disable-next-line: only-arrow-functions
    return function (target: object, propertyName: string, propertyDesciptor: PropertyDescriptor): any {
        const method: any = propertyDesciptor.value;
        // tslint:disable-next-line: typedef
        propertyDesciptor.value = async function (...args: Array<any>) {
            // tslint:disable-next-line: no-invalid-this
            const result: any = await method.apply(this, args);
            // tslint:disable-next-line: no-invalid-this
            this.setScope(result, dataName);
            return result;
        };
        return propertyDesciptor;
    };
}

@Component({
    selector: 'customer-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent extends DynamicComponent implements OnInit {

    public form: FormGroup;
    public constructor(
        private fb: FormBuilder,
        injector: Injector
    ) {
        super(injector);

        this.form = fb.group({
            name: [],
            age: [],
            remark: []
        });
    }

    public ngOnInit() {
    }

    @GetScope('form')
    public onFormValueChange(value: any): void {
        console.log('form get value change', value);
    }

    @SetScope('form')
    public save(): any {
        return this.form.value;
    }

}
