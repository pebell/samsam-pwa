import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { atom } from '@politie/sherlock';
import { environment } from 'src/environments/environment';
import { AES, enc } from 'crypto-js';
import { SimpleIDB } from './persistence';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

    public readonly gatewayUser$ = atom.unresolved<GatewayUser>();
    public readonly loggedIn$ = this.gatewayUser$.map(g => !!g);
    public readonly invalidCredentials$ = atom(false);

    constructor(private readonly http: HttpClient, ) { }

    async login(credentials: Credentials) {

        const headers = credentials.username
            ? new HttpHeaders().set('authorization', 'Basic ' + btoa(credentials.username + ':' + credentials.password))
            : new HttpHeaders();
        console.log(`Trying to log in with gateway at: ${environment.gatewayURL}, with credentials`, credentials);
        try {
            const user = await this.http.get<GatewayUser>(`${environment.gatewayURL}/user`, { headers }).toPromise();
            console.log('We are logged in at the SamSam Gateway,', user);
            this.setStoredCredentials(credentials);
            this.gatewayUser$.set(user);
            return true;
        } catch (error) {
            if (error.status === 401) {
                this.clearStoredCredentials();
                // alleen "false" als we heel zeker weten dat de fout komt door verkeerde credentials
                return false;
            } else {
                console.error(error);
                // undefined als we niet weten of de credentials goed zijn of niet
                return undefined;
            }
        }
    }


    loggedIn() {
        return this.gatewayUser$.resolved;
    }

    clearStoredCredentials() {
        this.invalidCredentials$.set(true);
        SimpleIDB.remove('credentials');
        window.localStorage.removeItem('credentials');
    }

    async getStoredCredentials() {
        const localCreds2 = await SimpleIDB.get('credentials') as Credentials;
        if (!localCreds2) {
            this.invalidCredentials$.set(true);
            return undefined;
        }
        return { username: localCreds2.username, password: this.decrypt(localCreds2.password) };
    }

    setStoredCredentials(credentials: Credentials) {
        this.invalidCredentials$.set(false);
        const creds = { username: credentials.username, password: this.encrypt(credentials.password)  };
        console.log('Successful login; storing credentials in local storage:', creds);
        SimpleIDB.set('credentials', creds);
    }

    encrypt(str: string) {
        return environment.production ? AES.encrypt(JSON.stringify(str), 'SUPERSECRETSAUCE' ).toString() : str;
        // return AES.encrypt(JSON.stringify(str), 'SUPERSECRETSAUCE' ).toString();
    }

    decrypt(str: string) {
        return environment.production ? JSON.parse(AES.decrypt(str, 'SUPERSECRETSAUCE').toString(enc.Utf8)) : str;
        // return AES.decrypt(str, 'SUPERSECRETSAUCE').toString(enc.Utf8);
    }

}

export interface Credentials {
    username: string;
    password: string;
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
