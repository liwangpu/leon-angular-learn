import { Component, OnInit } from '@angular/core';
import * as fromService from '../../../services';

@Component({
    selector: 'app-tenant-change',
    templateUrl: './tenant-change.component.html',
    styleUrls: ['./tenant-change.component.scss']
})
export class TenantChangeComponent implements OnInit {

    public tenantId: string;
    public constructor(
        private identitySrv: fromService.IdentityService
    ) {
        this.tenantId = localStorage.getItem('tenantId');
    }

    public ngOnInit(): void {
    }

    public async changeTenant(): Promise<void> {
        let res = await this.identitySrv.refreshToken(this.tenantId).toPromise();
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        localStorage.setItem('tenantId', this.tenantId);
        await this.identitySrv.getProfile().toPromise();
    }

}
