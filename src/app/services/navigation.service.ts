import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';
import { INavigation } from '../models';

@Injectable()
export class NavigationService {

    private _navigations: Array<INavigation>;
    public constructor() {
        this._navigations = [
            { id: 'a', name: '用户信息' },
            { id: 'b', name: '修改密码' },
            { id: 'c', name: '员工信息' }
        ];
    }

    public query(): Observable<Array<INavigation>> {
        return of(_.cloneDeep(this._navigations));
    }

    public create(data: INavigation): Observable<string> {
        let nav = { ...data };
        nav.id = uuidv4();
        this._navigations.push(nav);
        return of(nav.id);
    }

    public delete(id: string): Observable<void> {
        this._navigations = this._navigations.filter(x => x.id !== id);
        return of(null);
    }

}
