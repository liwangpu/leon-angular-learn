import { Injectable } from '@angular/core';
import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CustomRouteReuseStrategyService implements RouteReuseStrategy {

    constructor() { }

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return false;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {

    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return false;
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        return null;
    }

    shouldReuseRoute(before: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return false;
    }
}
