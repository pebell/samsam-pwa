import { Component } from '@angular/core';
import { AppService } from './app.service';
import { PwaService } from './pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'samsam-pwa';

  constructor(public readonly app: AppService, public readonly pwa: PwaService) {

  }

}
