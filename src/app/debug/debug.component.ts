import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppService } from '../app.service';
import { BackendService } from '../services/backend.service';

@Component({
    selector: 'app-debug',
    templateUrl: './debug.component.html',
    styleUrls: ['./debug.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebugComponent implements OnInit {
    constructor(private readonly app: AppService, private readonly backend: BackendService) {}

    user$ = this.backend.portalUser$;

    dataDump$ = this.user$.map(u => JSON.stringify(u, null, 2));

    ngOnInit(): void {}
}
