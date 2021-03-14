import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { atom } from '@politie/sherlock';
import { PortalUser } from 'src/app/services/lid';

@Component({
    selector: 'app-promo',
    templateUrl: './promo.component.html',
    styleUrls: ['./promo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoComponent implements OnInit {
    @Input() set lid(value: PortalUser) {
        this.lid$.set(value);
    }
    readonly lid$ = atom.unresolved<PortalUser>();

    constructor() {}

    ngOnInit(): void {}
}
