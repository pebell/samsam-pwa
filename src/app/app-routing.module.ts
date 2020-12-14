import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BedragenComponent } from './bedragen/bedragen.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SplashComponent } from './splash/splash.component';


const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'bedragen', component: BedragenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
