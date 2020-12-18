import { Injectable } from '@angular/core';
import { atom } from '@politie/sherlock';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor() { }

  showHeader$ = atom(false);
  showFooter$ = atom(false);

  showHeader(show: boolean) {
    // setTimeout(() => this.showHeader$.set(show), 1);
    this.showHeader$.set(show);
  }

  showFooter(show: boolean) {
    // setTimeout(() => this.showFooter$.set(show), 1);
    this.showFooter$.set(show);
  }

}
