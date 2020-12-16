import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { atom } from '@politie/sherlock';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly gatewayUser$ = atom.unresolved<GatewayUser>();
  public readonly loggedIn$ = this.gatewayUser$.map(g => !!g);

  private backendToken?: string;

  constructor(private readonly http: HttpClient, ) {
  }

  login(credentials: { username: string; password: string}) {
        const headers = credentials.username
            ? new HttpHeaders().set('authorization', 'Basic ' + btoa(credentials.username + ':' + credentials.password))
            : new HttpHeaders();
        console.log(`Trying to log in with gateway at: ${environment.gatewayURL}`);
        this.http.get<GatewayUser>(`${environment.gatewayURL}/user`, { headers }).subscribe( user => {
        console.log('We are logged in at the SamSam Gateway,', user);
        this.gatewayUser$.set(user);
        return true;
        },
        error => {
            if (error.status === 401) {
            alert('Wachtwoord en/of e-mailadres komt niet voor in ons systeem.');
            } else {
            console.error(error);
            }
        });
        return false;
  }


  loggedIn() {
    return this.gatewayUser$.resolved;
  }


}

export interface GatewayUser {
  name: string;
  principal: string;
  gatewaySecret: string;
  firstName: string;
  fullName: string;
  kring_name: string;
  role: string;
  roles: string[];
  label: string;
}
