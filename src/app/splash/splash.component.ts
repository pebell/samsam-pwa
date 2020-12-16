import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppService } from '../app.service';
import { ComponentsService } from '../components/components.service';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  credentials = {
    username: 'peter.ebell@me.com',
    password: '91FSiPmk',
  };

  gatewayUser?: GatewayUser;

  constructor(
    public readonly app: AppService,
    private readonly cs: ComponentsService,
    private readonly router: Router,
    private readonly http: HttpClient,
  ) { }

  ngOnInit(): void {
    if (!this.gatewayUser) {
      this.login();
    }
  }

  login() {

    const headers = this.credentials.username ? new HttpHeaders().set(
      'authorization', 'Basic ' + btoa(this.credentials.username + ':' + this.credentials.password)
    ) : new HttpHeaders();

    this.http.get<GatewayUser>(`${environment.gatewayURL}/user`, { headers }).subscribe( user => {
      console.log('We are logged in,');
      console.log(user);
      const authenticated = true;
      // this.user = this.authenticated ? user['name'] : '';
      this.gatewayUser = user;
      return true;
    },
      error => {

        if (error.status === 401) {
          alert('Wachtwoord en/of e-mailadres komt niet voor in ons systeem. ' +
                        'Je kunt een nieuw wachtwoord aanvragen met de link hierboven.');
        } else {
          console.error(error);
        }
      });
    return false;
  }
}

interface GatewayUser {
  name: string;
  roles: string[];
  label: string;
}
