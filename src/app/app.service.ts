import { Injectable } from '@angular/core';
import { atom } from '@politie/sherlock';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  showHeader$ = atom(false);
  showFooter$ = atom(false);

  public showHeader(show: boolean) {
    setTimeout(() => this.showHeader$.set(show), 100);
  }

  public showFooter(show: boolean) {
    setTimeout(() => this.showFooter$.set(show),1);
  }

  
}
