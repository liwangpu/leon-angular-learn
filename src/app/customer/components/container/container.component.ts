import { AfterViewInit, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { StateStoreService } from 'src/app/state-store';
import { SubSink } from 'subsink';
import { DynamicComponent } from '../home/home.component';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements AfterViewInit, OnDestroy {

    private subs: SubSink = new SubSink();
    public constructor(
        private dyc: DynamicComponent,
        private injector: Injector
    ) { }

    private get stateStore(): StateStoreService {
        return this.injector.get(StateStoreService);
    }

    public ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    public ngAfterViewInit(): void {
        // console.log(1, this.dyc);
        const keys: Array<any> = Reflect.getMetadataKeys(this.dyc);
        keys.forEach(k => {
            let { dataName } = Reflect.getMetadata(k, this.dyc);

            this.subs.sink = this.stateStore.generateScopeSelector(`${this.dyc.key}.${dataName}`).subscribe(res => {
                console.log('dc', res);
            });


            console.log('md', dataName);
        });
        console.log('keys', keys);
    }

}
