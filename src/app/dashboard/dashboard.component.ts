import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';
import { BackendService } from '../services/backend.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    constructor(private readonly app: AppService, private readonly backend: BackendService) {}

    user$ = this.backend.portalUser$;
    dataDump$ = this.user$.map(u => JSON.stringify(u, null, 2));

    ngOnInit(): void {
        this.app.showFooter(true);
    }
}
