import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { PwaService } from '../pwa.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  constructor(public app: AppService, private readonly router: Router) { }

  ngOnInit(): void {
    // console.log('has prompt event: '+!!this.Pwa.promptEvent);
    setTimeout(() => { 

        this.router.navigate(['/home']) 
    },3000);

  }
}
