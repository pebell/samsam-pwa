import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { atom  } from '@politie/sherlock';

@Injectable({
  providedIn: 'root'
})
export class PwaService {

  constructor(private swUpdate: SwUpdate) {
    // console.log('registering listerer for beforeinstallprompt WTF');
    // window.addEventListener('beforeinstallprompt', event => {
    //   console.log('beforeinstallprompt WTF');
    // });
    console.log('subscribing to swUpdate');
    swUpdate.available.subscribe(event => {
      // if (askUserToUpdate()) {
        window.location.href='/';
        window.alert('BOO');
        window.location.reload();
      // }
    });
  }
}