import { Component, forwardRef, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StateStoreService } from 'src/app/state-store';
import 'reflect-metadata';


export class DynamicComponent {

    public key: string = 'userMessage';
    constructor(
        protected injector: Injector
    ) {
        // const keys: Array<any> = Reflect.getMetadataKeys(this);
        // keys.forEach(k => {
        //     let { dataName } = Reflect.getMetadata(k, this);

        //     this.stateStore.generateScopeSelector(`${this.key}.${dataName}`);


        //     console.log('md', dataName);
        // });
        // console.log('keys', keys);

    }

    private get stateStore(): StateStoreService {
        return this.injector.get(StateStoreService);
    }

    private setScope(data: { [key: string]: any }, action: string): void {
        this.stateStore.setScopeData(data, this.key, action);
    }
}

export function GetScope(dataName: string) {

    return function (target: object, propertyName: string): any {
        Reflect.defineMetadata(propertyName, { dataName }, target);
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
    styleUrls: ['./home.component.scss'],
    providers: [
        {
            provide: DynamicComponent,
            useExisting: forwardRef(() => HomeComponent)
        }
    ]
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

    public ngOnDestroy(): void {
        // console.log('home destroy');
    }

    public ngOnInit() {
    }

    @GetScope('validate')
    public onFormValidChange(value: any): void {
        console.log('form get value change', value);
    }

    @GetScope('data')
    public onFormValueChange(value: any): void {
        console.log('form get value change', value);
    }

    @SetScope('data')
    public save(): any {
        return this.form.value;
    }

}
