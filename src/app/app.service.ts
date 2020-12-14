import { Injectable } from '@angular/core';
import { atom, derive } from '@politie/sherlock';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor() { 
    console.log('registering listerer for beforeinstallprompt FINAL');
    window.addEventListener('beforeinstallprompt', event => {
        console.log('beforeinstallprompt FINAL');
        this.promptEvent$.set(event);
    });
    console.log('registering listerer for appinstalled FINAL');
    window.addEventListener('appinstalled', (evt) => {
      // Log install to analytics
      console.log('INSTALL: Success');
    });
  }

  promptEvent$ = atom.unresolved() ;

  showHeader$ = atom(false);
  showFooter$ = atom(false);

  showHeader(show: boolean) {
    setTimeout(() => this.showHeader$.set(show), 1);
  }

  showFooter(show: boolean) {
    setTimeout(() => this.showFooter$.set(show),1);
  }

  installPwa(): void {
    (this.promptEvent$.get() as any).prompt();
  }
}
