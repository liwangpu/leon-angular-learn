import { Injectable } from '@angular/core';
import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CustomRouteReuseStrategyService implements RouteReuseStrategy {

    routesToCache: string[] = ["search", "list"];
    storedRouteHandles = new Map<string, DetachedRouteHandle>();
    constructor() { }

    // Decides if the route should be stored
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return this.routesToCache.indexOf(route.routeConfig.path) > -1;
    }

    //Store the information for the route we're destructing
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        console.log('shouldDetach', route);
        this.storedRouteHandles.set(route.routeConfig.path, handle);
    }

    //Return true if we have a stored route object for the next route
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        console.log('shouldAttach', route);
        return this.storedRouteHandles.has(route.routeConfig.path);
    }

    //If we returned true in shouldAttach(), now return the actual route data for restoration
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        return this.storedRouteHandles.get(route.routeConfig.path);
    }

    //Reuse the route if we're going to and from the same route
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        // console.log(1,this.storedRouteHandles.size);
        return future.routeConfig === curr.routeConfig;
    }

    // shouldDetach(route: ActivatedRouteSnapshot): boolean {
    //     // console.log('shouldDetach', route);
    //     return false;
    // }

    // store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    //     // console.log('store', route, handle);
    // }

    // shouldAttach(route: ActivatedRouteSnapshot): boolean {
    //     // console.log('shouldAttach', route);
    //     return false;
    // }

    // retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    //     // console.log('retrieve', route);
    //     return null;
    // }

    // shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    //     console.log('shouldReuseRoute future', future);
    //     console.log('shouldReuseRoute curr', curr);
    //     return future.routeConfig === curr.routeConfig;
    // }
}
