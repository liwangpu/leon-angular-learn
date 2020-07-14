import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IFavorite } from '../models';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';

@Injectable()
export class FavoriteService {

    private _favorites: Array<IFavorite>;
    public constructor() {
        this._favorites = [
            { id: '1', name: '用户信息', navigationId: 'a' }
        ];
    }

    public query(): Observable<Array<IFavorite>> {
        return of(_.cloneDeep(this._favorites));
    }

    public create(data: IFavorite): Observable<string> {
        let nav = _.cloneDeep(data);
        nav.id = uuidv4();
        this._favorites.push(nav);
        return of(nav.id);
    }

    public delete(id: string): Observable<void> {
        this._favorites = this._favorites.filter(x => x.id !== id);
        return of(null);
    }
}
