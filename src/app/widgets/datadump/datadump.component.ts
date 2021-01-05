import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { atom } from '@politie/sherlock';
import { PortalUser } from '../../services/lid';

@Component({
  selector: 'app-datadump',
  templateUrl: './datadump.component.html',
  styleUrls: ['./datadump.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatadumpComponent implements OnInit {

    @Input() set lid(value: PortalUser) {
        this.lid$.set(value);
    }
    readonly lid$ = atom.unresolved<PortalUser>();

    readonly dataDump$ = this.lid$.map(u => JSON.stringify(u, null, 2));

    constructor() { }

    ngOnInit(): void {
    }

}
