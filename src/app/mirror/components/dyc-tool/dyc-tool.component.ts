import { Component, OnInit } from '@angular/core';
import { ComponentDesignDataStoreService, PageMetaDataStoreService, ResourceDataStoreService } from '../../services';
import * as _ from "lodash";
import * as moment from 'moment';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-dyc-tool',
    templateUrl: './dyc-tool.component.html',
    styleUrls: ['./dyc-tool.component.scss']
})
export class DycToolComponent implements OnInit {

    public constructor(
        private pageMetaDataSrv: PageMetaDataStoreService,
        private componentDesignDataStore: ComponentDesignDataStoreService,
        private resourceDataStore: ResourceDataStoreService
    ) { }

    public ngOnInit(): void {
    }

    public async deleteDuplicateComponent(): Promise<void> {
        let { items: components } = await this.componentDesignDataStore.getAll().toPromise();

        const componentKeys: Array<string> = _.uniq(components.map(c => c.key));

        for (let key of componentKeys) {
            // let key = 'system_page_list';
            const updatedAtProperty = '@updatedAt';
            let duplicates = components.filter(c => c.key === key).map(x => {
                x[updatedAtProperty] = moment.utc(x.updatedAt).unix();
                return x;
            }).sort(function (a, b) {
                if (a[updatedAtProperty] > b[updatedAtProperty]) {
                    return -1;
                }
                if (a[updatedAtProperty] < b[updatedAtProperty]) {
                    return 1;
                }
                return 0;
            });

            let needDeleteIds: Array<string> = [];
            if (duplicates.length > 1) {
                needDeleteIds = duplicates.slice(1).map(x => x.id);
            }

            for (let id of needDeleteIds) {
                await await this.componentDesignDataStore.delete(id).toPromise()
            }
        }

        // let key = 'system_page_list';
        // const updatedAtProperty = '@updatedAt';
        // let duplicates = components.filter(c => c.key === key).map(x => {
        //     x[updatedAtProperty] = moment.utc(x.updatedAt).unix();
        //     return x;
        // }).sort(function (a, b) {
        //     if (a[updatedAtProperty] > b[updatedAtProperty]) {
        //         return -1;
        //     }
        //     if (a[updatedAtProperty] < b[updatedAtProperty]) {
        //         return 1;
        //     }
        //     return 0;
        // });

        // let needDeleteIds: Array<string> = [];
        // if (duplicates.length > 1) {
        //     needDeleteIds = duplicates.slice(1).map(x => x.id);
        // }

        // // for (let id of needDeleteIds) {
        // //     await await this.componentDesignDataStore.delete(id).toPromise()
        // // }
        // console.log(1, duplicates, needDeleteIds);

    }

    public async deleteDuplicatePage(): Promise<void> {
        let { items: pages } = await this.pageMetaDataSrv.getAll().toPromise();

        const pageKeys: Array<string> = _.uniq(pages.map(c => c.key));

        for (let key of pageKeys) {
            // let key = 'system_page_list';
            const updatedAtProperty = '@updatedAt';
            let duplicates = pages.filter(c => c.key === key).map(x => {
                x[updatedAtProperty] = moment.utc(x.updatedAt).unix();
                return x;
            }).sort(function (a, b) {
                if (a[updatedAtProperty] > b[updatedAtProperty]) {
                    return -1;
                }
                if (a[updatedAtProperty] < b[updatedAtProperty]) {
                    return 1;
                }
                return 0;
            });

            let needDeleteIds: Array<string> = [];
            if (duplicates.length > 1) {
                needDeleteIds = duplicates.slice(1).map(x => x.id);
            }

            for (let id of needDeleteIds) {
                await await this.pageMetaDataSrv.delete(id).toPromise()
            }
        }
    }

    public async gridViewAddBussinesKey(): Promise<void> {
        let businesses: Array<{ key: string; id: string }> = await this.resourceDataStore.query('system_business', { pagination: 'limit=99999' }).pipe(map(res => res.items)).toPromise();
        let gridViews: Array<{ businessKey: string; businessId: string; id: string }> = await this.resourceDataStore.query('system_grid_view', { pagination: 'limit=99999' }).pipe(map(res => res.items)).toPromise();
        let pdatas: Array<any> = [];
        for (let view of gridViews) {
            let bs = businesses.find(b => b.key === view.businessKey);
            if (!bs) { continue; }
            pdatas.push({ id: view.id, businessId: bs.id });
        }

        for (let pdata of pdatas) {
            let id = pdata.id;
            delete pdata.id;
            await this.resourceDataStore.patch('system_grid_view', id, pdata).toPromise();
        }


        // console.log(1, pdatas);
    }

    public async changeBusinessModel(): Promise<void> {
        let businesses: Array<{ key: string; id: string }> = await this.resourceDataStore.query('system_business', { pagination: 'limit=99999' }).pipe(map(res => res.items)).toPromise();
        let models: Array<any> = await this.resourceDataStore.query('system_model', { pagination: 'limit=99999' }).pipe(map(res => res.items)).toPromise();
        let pdatas: Array<any> = [];
        for (let bs of businesses) {
            let model = models.find(m => m.key === bs.key);
            if (!model) { continue; }
            pdatas.push({ id: bs.id, modelId: model.id });
        }

        for (let pdata of pdatas) {
            let id = pdata.id;
            delete pdata.id;
            await this.resourceDataStore.patch('system_business', id, pdata).toPromise();
        }
        console.log(1, pdatas);

    }
}
