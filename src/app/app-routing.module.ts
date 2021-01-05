import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BedragenComponent } from './bedragen/bedragen.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PwaService } from './pwa.service';
import { SplashComponent } from './splash/splash.component';

const routes: Routes = [
    { path: '', component: SplashComponent },
    { path: 'home', component: DashboardComponent, canActivate: [PwaService] },
    { path: 'bedragen', component: BedragenComponent, canActivate: [PwaService] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
