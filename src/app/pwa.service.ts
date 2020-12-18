import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { atom  } from '@politie/sherlock';
import { Observable } from 'rxjs';
import { ComponentsService } from './components/components.service';
import ms from 'ms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PwaService implements CanActivate  {

  lastUpdateCheck?: Date = undefined;
  promptEvent$ = atom.unresolved();

  constructor(private readonly cs: ComponentsService, private readonly swUpdate: SwUpdate) {
    if (environment.production) {
      this.registerInstallPromptListener();
      this.registerAppInstalledListener();
      this.registerUpdateAvailableListener();
    } else {
      console.log('Running in local mode - no PWA features');
    }
  }

  registerInstallPromptListener() {
    console.log('registering listener for beforeinstallprompt');
    window.addEventListener('beforeinstallprompt', event => {
        console.log('beforeinstallprompt BASTA');
        this.promptEvent$.set(event);
    });
  }

  registerAppInstalledListener() {
    console.log('registering listener for appinstalled');
    window.addEventListener('appinstalled', (evt) => {
      console.log('INSTALL: Success');
    });
  }

  registerUpdateAvailableListener() {
    console.log('subscribing to updateAvailable');
    this.swUpdate.available.subscribe(async event => {
      if (await this.askUserToUpdate()) {
        window.location.reload();
      }
    });
  }

  installPwa(): void {
    (this.promptEvent$.get() as any).prompt();
  }

  /**
   *  By implementing the CanActivate interface and registrering this class on the major routes of this app,
   *  we can trigger the update check periodically.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const now = new Date();
    if (environment.production && (!this.lastUpdateCheck || now.getTime() - this.lastUpdateCheck.getTime() > ms( '1 minute') )) {
      console.log('Checking for update');
      this.lastUpdateCheck = now;
      this.swUpdate.checkForUpdate();
    }
    return true;
  }

  async askUserToUpdate() {
    return await this.cs.confirm('Nieuwe versie beschikbaar'
      , 'Er is een nieuwe versie van de Mijn SamSam app beschikbaar. Klik op "OK" om te downloaden. Tot die tijd zal de functionaliteit van de app mogelijk beperkt zijn.');
  }
}
