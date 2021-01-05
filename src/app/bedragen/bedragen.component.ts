import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { BackendService } from '../services/backend.service';

@Component({
    selector: 'app-bedragen',
    templateUrl: './bedragen.component.html',
    styleUrls: ['./bedragen.component.scss'],
})
export class BedragenComponent implements OnInit {
    constructor(private readonly app: AppService, private readonly backend: BackendService) {}

    user$ = this.backend.portalUser$;

    dataDump$ = this.user$.map(u => JSON.stringify(u, null, 2));

    ngOnInit(): void {}
}
