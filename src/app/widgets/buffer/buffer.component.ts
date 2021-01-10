import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { atom } from '@politie/sherlock';
import { PortalUser } from 'src/app/services/lid';
import { toCurrency } from 'src/app/services/utils';

@Component({
    selector: 'app-buffer',
    templateUrl: './buffer.component.html',
    styleUrls: ['./buffer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BufferComponent implements OnInit {
    @Input() set lid(value: PortalUser) {
        this.lid$.set(value);
    }
    readonly lid$ = atom.unresolved<PortalUser>();

    // @Input() lid!: PortalUser;

    toCur = toCurrency;

    constructor() {}

    ngOnInit(): void {}

    maxBuffer(lid: PortalUser) {
        if (!lid.kring) {
            return 666;
        }
        return (lid.payment * lid.kring.saving_percentage * lid.kring.max_buffer) / 100.0;
    }

    isOverschot(lid: PortalUser) {
        return lid.saldoTotalen.saldo >= this.maxBuffer(lid) + 10;
    }
}
