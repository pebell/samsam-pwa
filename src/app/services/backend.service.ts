import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { atom } from '@politie/sherlock';
import { fromObservable } from '@politie/sherlock-rxjs';
import { environment } from 'src/environments/environment';
import { AuthService, GatewayUser } from '../auth/auth.service';
import { ErrorService } from './error.service';
import { PortalUser } from './lid';

@Injectable({
    providedIn: 'root',
})
export class BackendService {
    constructor(private readonly http: HttpClient, private readonly auth: AuthService, private readonly err: ErrorService) {
        // Whenever we get a new backend token, refresh the portal user
        this.backendToken$.react(_ => this.refreshPortalUser());
        this.portalUser$.react(u => console.log(u));
    }

    public backendToken$ = this.auth.gatewayUser$
        .flatMap(g => this.obtainBackendToken(g))
        .pluck('token')
        // make backendToken$ unresolved when an error occurs
        .mapState(s => this.err.unresolvedOnError(s));

    public portalUser$ = atom.unresolved<PortalUser>();

    private obtainBackendToken({ principal, gatewaySecret }: GatewayUser) {
        console.log(`Obtaining session token from SamSam Nest backend for ${principal}`);
        return fromObservable(
            this.http.post<{ token: string }>(`${environment.backendURL}/auth/create-token`, { principal, gatewaySecret }),
        );
    }

    public refreshPortalUser() {
        console.log(`Refreshing portal user`);
        const u = fromObservable(
            this.http.get<PortalUser>(`${environment.backendURL}/leden/lidportal`, { headers: this.getBackendHeaders() }),
        );
        u.react(p => this.portalUser$.set(p));
        return u;
    }

    getBackendHeaders() {
        return this.backendToken$.resolved
            ? new HttpHeaders().set('authorization', `bearer ${this.backendToken$.get()}`)
            : new HttpHeaders();
    }
}
