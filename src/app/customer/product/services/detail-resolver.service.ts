import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class DetailResolverService implements Resolve<any> {

    constructor() { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        console.log('resolve work');
        return null;
    }
}
