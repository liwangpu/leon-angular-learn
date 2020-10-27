import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

export interface IIdentityToken {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token: string;
    scope: string;
    uuid?: string;
}

@Injectable()
export class IdentityService {

    private uri: string = `${environment.APIServer}`;
    public constructor(
        private httpClient: HttpClient
    ) { }

    public login(account: { username: string; password: string }): Observable<IIdentityToken> {
        let url: string = `${this.uri}/ids/connect/token`;

        const body: FormData = new FormData();
        body.set('grant_type', 'password');
        body.set('client_id', 'server');
        body.set('username', account.username);
        body.set('password', account.password);
        return this.httpClient.post<IIdentityToken>(url, body);
    }

    public refreshToken(tenantId?: string): Observable<{ access_token: string; refresh_token: string }> {
        let refreshToken: string = localStorage.getItem('refresh_token');
        const body: FormData = new FormData();
        body.set('grant_type', 'refresh_token');
        body.set('client_id', 'server');
        body.set('refresh_token', refreshToken);

        if (tenantId) {
            body.set('tenantId', tenantId);
        }

        return this.httpClient.post<IIdentityToken>(`${this.uri}/ids/connect/token`, body);
    }

    public getProfile(): Observable<any> {
        return this.httpClient.get<any>(`${this.uri}/ids/Identity/Profile`);
    }
}
