import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { ComponentsService } from '../components/components.service';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  constructor(public readonly app: AppService, private readonly cs: ComponentsService, private readonly router: Router) { }

  ngOnInit(): void {
  }
}
