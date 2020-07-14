import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FavoriteService } from 'src/app/services';
import { switchMap, map } from 'rxjs/operators';
import * as fromAction from './action';

@Injectable()
export class FavoriteEffectService {

    public constructor(
        private actions$: Actions,
        private favoriteSrv: FavoriteService
    ) { }

    refresh$ = createEffect(() => this.actions$
        .pipe(ofType(fromAction.refreshFavorite))
        .pipe(switchMap(() => this.favoriteSrv.query()))
        .pipe(map(favs => fromAction.setFavorites({ favorites: favs })))
    );

    add$ = createEffect(() => this.actions$
        .pipe(ofType(fromAction.addFavorite))
        .pipe(switchMap(({ favorite }) => this.favoriteSrv.create(favorite)))
        .pipe(map(() => fromAction.refreshFavorite()))
    );

    remove$ = createEffect(() => this.actions$
        .pipe(ofType(fromAction.removeFavorite))
        .pipe(switchMap(({ id }) => this.favoriteSrv.delete(id)))
        .pipe(map(() => fromAction.refreshFavorite()))
    );
}
