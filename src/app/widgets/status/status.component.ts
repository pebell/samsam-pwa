import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { PortalUser } from '../../services/lid';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusComponent implements OnInit {

    @Input() lid!: PortalUser;

    allesOK = false;

    constructor() { }

    ngOnInit(): void {
       this.allesOK = this.lid.saldoTotalen.saldo < this.lid.saldoTotalen.schenkbuffer_calc;
    }

}
