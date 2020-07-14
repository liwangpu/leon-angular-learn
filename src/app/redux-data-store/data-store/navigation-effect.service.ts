import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NavigationService } from 'src/app/services';
import * as fromAction from './action';

@Injectable()
export class NavigationEffectService {

    public constructor(
        private actions$: Actions,
        private navigationSrv: NavigationService
    ) { }

    refresh$ = createEffect(() => this.actions$
        .pipe(ofType(fromAction.refreshNavigation))
        .pipe(switchMap(() => this.navigationSrv.query()))
        .pipe(map(navs => fromAction.setNavigations({ navigations: navs })))
    );

    add$ = createEffect(() => this.actions$
        .pipe(ofType(fromAction.addNavigation))
        .pipe(switchMap(({ navigation }) => this.navigationSrv.create(navigation)))
        .pipe(map(() => fromAction.refreshNavigation()))
    );

    remove$ = createEffect(() => this.actions$
        .pipe(ofType(fromAction.removeNavigation))
        .pipe(switchMap(({ id }) => this.navigationSrv.delete(id)))
        .pipe(map(() => fromAction.refreshNavigation()))
    );
}
