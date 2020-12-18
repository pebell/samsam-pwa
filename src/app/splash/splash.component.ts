import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { atom, unresolved } from '@politie/sherlock';
import { AppService } from '../app.service';
import { AuthService, Credentials } from '../auth/auth.service';
import { ComponentsService } from '../components/components.service';
import { BackendService } from '../services/backend.service';

import { environment } from 'src/environments/environment';
import { SimpleIDB } from '../auth/persistence';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

    constructor(
        public readonly app: AppService,
        private readonly auth: AuthService,
        private readonly backend: BackendService,
    ) { }

    usedStoredCredentials = false;
    userName$ = this.auth.gatewayUser$.pluck('firstName');
    portalUser$ = this.backend.portalUser$;
    loggedIn$ = this.auth.loggedIn$;
    needsLogin$ = this.auth.invalidCredentials$;
    message$ = atom.unresolved<string>();

    credentials: Credentials = { username: '', password: ''};

    ngOnInit(): void {
        SimpleIDB.initialize().then( _ => {
            this.auth.getStoredCredentials().then(storedCreds => {
                if (!this.auth.loggedIn() && storedCreds) {
                    // We are not logged in, but we have locally stored credentials from last time
                    this.usedStoredCredentials = true;
                    this.auth.login(storedCreds).then(r => this.handleLoginResult(r));
                }
            });
        });

        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('display-mode is standalone');
        } else {
            console.log('we seem to be running in a plain browser, yuck!');
        }
    }

    /**
     * This method is called from the login button on the Login UI widget.
     */
    login() {
        if (this.credentials.username && this.credentials.password) {
            this.auth.login(this.credentials).then(r => this.handleLoginResult(r));
        }
    }

    handleLoginResult(r: boolean | undefined){
        if (r) {
            this.message$.set(unresolved);
            return;
        } else {
            const m = r === false
                ? 'Ongeldige gebruikersnaam en/of wachtwoord'
                : 'Inloggen is momenteel niet mogelijk. Probeer het later opnieuw.';
            this.message$.set(m);
            this.usedStoredCredentials = false;
        }
    }}

/*
// Detects if device is on iOS
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test( userAgent );
}
// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// Checks if should display install popup notification:
if (isIos() && !isInStandaloneMode()) {
  // offer app installation here
}
*/
