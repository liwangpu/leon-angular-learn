import { Component, OnInit } from '@angular/core';
import { ComponentDesignDataStoreService, PageMetaDataStoreService, ResourceDataStoreService } from '../../services';
import * as _ from "lodash";
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { GenerateShortId } from '../../../uuid-tool';
import * as escapeStringRegexp from 'escape-string-regexp';

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
        let components: Array<{ dataSourceKey: string; id: string }> = await this.resourceDataStore.query('system_component_1', { pagination: 'limit=99999' }).pipe(map(res => res.items)).toPromise();
        let pdatas: Array<any> = [];
        for (let com of components) {
            let bs = businesses.find(b => b.key === com.dataSourceKey);
            if (!bs) { continue; }
            pdatas.push({ id: com.id, businessId: bs.id });
        }

        for (let pdata of pdatas) {
            let id = pdata.id;
            delete pdata.id;
            await this.resourceDataStore.patch('system_component_1', id, pdata).toPromise();
        }
        console.log(1, pdatas);

    }

    public async gridViewDefaultIdToKey(): Promise<void> {
        if (localStorage.getItem('viewMap1')) { return; }
        let views = await this.resourceDataStore.query('system_grid_view', { pagination: 'limit=99999' }).pipe(map(res => res.items)).toPromise();
        let viewMap: { [key: string]: string } = {};
        for (let view of views) {
            let v: any = JSON.parse(view.view);
            if (v.id === '_ALL') { continue; }
            let vid = GenerateShortId();
            viewMap[v.id] = vid;
            v.id = vid;
            view.view = JSON.stringify(v);
            view.viewKey = vid;
            // if (!v.id) {
            //     await this.resourceDataStore.delete('system_grid_view', view.id).toPromise();
            // }
        }
        localStorage.setItem('viewMap1', JSON.stringify(viewMap));

        let oldViewKeys = Object.keys(viewMap);
        for (let oid of oldViewKeys) {
            let view = views.find(v => v.id === oid);
            await this.resourceDataStore.patch('system_grid_view', view.id, { viewKey: view.viewKey, view: view.view }).toPromise();
        }
        // console.log(1,views);   
    }

    public async pageMetadataDefaultIdToKey(): Promise<void> {
        let viewMap: { [key: string]: string } = JSON.parse(localStorage.getItem('viewMap1'));
        let pages = await this.resourceDataStore.query('system_business_page', { pagination: 'limit=99999' }).pipe(map(res => res.items)).toPromise();
        for (let page of pages) {
            // if (page.id != '5f6d8c9cfb53d20a9cd04ec8') { continue; }
            let designerDraft = page.designerDraft;
            let metadata: string = page.metadata;

            let vids: Array<string> = Object.keys(viewMap);
            for (let vid of vids) {
                let reg = new RegExp(escapeStringRegexp(vid), 'g');
                // // console.log(1,reg);

                if (reg.test(metadata)) {
                    // console.log('前', JSON.parse(metadata));
                    // console.log('vid', vid);
                    // console.log('pid', page.id);
                    metadata = metadata.replace(reg, viewMap[vid]);
                    designerDraft = designerDraft.replace(reg, viewMap[vid]);

                    await this.resourceDataStore.patch('system_business_page', page.id, { designerDraft, metadata }).toPromise();
                    // console.log('后', JSON.parse(metadata));
                }
                // if (metadata.includes(`${vid}`)) {
                //     console.log(metadata);

                // }

                // url = url.replace(new RegExp(escapeStringRegexp(rootUrl)), '');
            }
            // console.log(0, designerDraft);
            // console.log(1, metadata);
        }
        // console.log(1, pages);

    }

    public async changeAllGridViewToKey(): Promise<void> {
        let views = await this.resourceDataStore.query('system_grid_view', { pagination: 'limit=99999' }).pipe(map(res => res.items)).toPromise();
        for (let view of views) {
            if (view.viewKey) { continue; }
            let v: any = JSON.parse(view.view);
            view.viewKey = v.id;
            // console.log(1, view);

            // let v: any = JSON.parse(view.view);

            // let vid = GenerateShortId();
            // v.id = vid;
            // view.view = JSON.stringify(v);
            // view.viewKey = vid;
            await this.resourceDataStore.patch('system_grid_view', view.id, { viewKey: view.viewKey }).toPromise();
            // console.log(1,view);

            // viewMap[v.id] = vid;
            // v.id = vid;
            // view.view = JSON.stringify(v);
            // view.viewKey = vid;
            // if (!v.id) {
            //     await this.resourceDataStore.delete('system_grid_view', view.id).toPromise();
            // }
        }

    }
}
