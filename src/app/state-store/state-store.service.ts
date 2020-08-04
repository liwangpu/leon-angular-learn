import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as fromAction from './action';
import * as fromSelector from './selector';
import * as fromState from './state';

function prepareScope(variables: Array<string>, data: any): { [key: string]: any } {
    let scope: any = {};
    // 准备初始值
    variables.forEach(v => {

        if (!_.has(scope, v)) {
            let vs: Array<string> = v.split('.');
            let len: number = vs.length;
            if (len === 1) {
                scope[v] = _.get(data, v);
            }
            // tslint:disable-next-line: no-ignored-return
            vs.reduce((acc, cur, index): string => {
                if (!_.has(scope, acc)) {
                    scope[acc] = {};
                }

                if (!_.has(scope, `${acc}.${cur}`)) {
                    _.get(scope, acc)[cur] = index + 1 === len ? (_.get(data, `${acc}.${cur}`)) : {};
                }

                return `${acc}.${cur}`;
            });
        }
    });
    return scope;
}

@Injectable()
export class StateStoreService {

    public constructor(
        private store: Store<fromState.IStoreState>
    ) { }

    public get scopeData$(): Observable<{ [key: string]: any }> {
        return this.store.select(fromSelector.selectScopeData);
    }

    public get previewMode$(): Observable<boolean> {
        return this.store.select(fromSelector.selectPreviewMode);
    }


    public setScopeData(scope: { [key: string]: any }, key?: string, action?: string): void {
        this.store.dispatch(fromAction.setScopeData({ scope, key, action }));
    }

    public resetScopeData(from?: string): void {
        this.store.dispatch(fromAction.resetScopeData({ from }));
    }


    // public notifyWhenExpressionChange(expression: {} | string): Observable<any> {
    //     let variables: Array<string> = fromUtils.ExpressionTranslator.analyzeVariable(expression);
    //     if (!variables.length) {
    //         return of(fromUtils.ExpressionTranslator.translateExpression(expression, {}));
    //     }
    //     let dySelector: any = createSelector(
    //         fromSelector.selectStoreState,
    //         state => {
    //             // 准备初始值
    //             let mirror: any = prepareScope(variables, state.mirror);
    //             return JSON.stringify(mirror);
    //         }
    //     );
    //     return this.store.select(dySelector).pipe(map(str => {
    //         let mirror: { [key: string]: any } = JSON.parse(str);
    //         return fromUtils.ExpressionTranslator.translateExpression(expression, mirror);
    //     }));

    // }

    public async getScopeDataSnapshot(): Promise<{ [key: string]: any }> {
        return this.scopeData$.pipe(take(1)).toPromise();
    }

}
