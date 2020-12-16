import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { AuthService } from '../auth/auth.service';
import { ComponentsService } from '../components/components.service';
import { BackendService } from '../services/backend.service';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

    constructor(
        public readonly app: AppService,
        private readonly cs: ComponentsService,
        private readonly router: Router,
        private readonly auth: AuthService,
        private readonly backend: BackendService,
    ) { }

    user$ = this.auth.gatewayUser$.pluck('firstName');
    loggedIn$ = this.auth.loggedIn$;

    ngOnInit(): void {
        if (!this.auth.loggedIn() && this.getStoredCredentials()) {
        this.auth.login(this.getStoredCredentials());
        }
    }

    getStoredCredentials() {
        return {
            username: 'peter.ebell@me.com',
            password: '91FSiPmk',
        };
    }

}

