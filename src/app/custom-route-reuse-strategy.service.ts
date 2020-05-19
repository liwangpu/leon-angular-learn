import { Injectable } from '@angular/core';
import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CustomRouteReuseStrategyService implements RouteReuseStrategy {

    constructor() { }

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        console.log('shouldDetach', route);
        return false;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        console.log('store', route, handle);
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        console.log('shouldAttach', route);
        return false;
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        console.log('retrieve', route);
        return null;
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        console.log('shouldReuseRoute future', future);
        console.log('shouldReuseRoute curr', curr);
        return false;
    }
}
