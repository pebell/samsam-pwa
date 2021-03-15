import { ArrayDataSource } from '@angular/cdk/collections';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { atom } from '@politie/sherlock';
import moment from 'moment-mini';
import { AppService } from 'src/app/app.service';
import { BackendService } from 'src/app/services/backend.service';
import { PortalUser, Transactie } from 'src/app/services/lid';

type Period = {
    period: string;
    transacties: Trans[];
};

type Trans = {
    date: string;
    type: string;
    amount: string;
    confirmed: boolean;
};

@Component({
    selector: 'app-transacties',
    templateUrl: './transacties.component.html',
    styleUrls: ['./transacties.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactiesComponent implements OnInit {
    @Input() set lid(value: PortalUser) {
        this.lid$.set(value);
    }
    readonly lid$ = atom.unresolved<PortalUser>();
    readonly transacties$ = this.lid$
        .pluck('transacties')
        .map(ts => ts.filter(t => t.type !== 'schenking'))
        .map(ts => ts.sort(compTrans))
        .map(ts => (console.log(ts), ts));
    readonly periods$ = this.transacties$.map(toPeriods);

    constructor() {}

    ngOnInit(): void {
        this.periods$.react(p => console.log(p));
    }
}

function toPeriods(transacties: Transactie[]) {
    const periods: Period[] = [];
    let curPeriod: Period | undefined;
    for (const t of transacties) {
        if (!curPeriod || curPeriod.period !== t.period) {
            periods.push((curPeriod = { period: t.period, transacties: [] }));
        }
        curPeriod.transacties.push({
            date: shortDate(t.transaction_date),
            type: t.type,
            amount: currency(t.amount),
            confirmed: t.confirmed,
        });
    }

    return periods;
}

function shortDate(d: string) {
    return moment(d).format('D MMM');
}

function currency(a: number) {
    return `€ ${a.toFixed(2)}`;
}

function compTrans(a: Transactie, b: Transactie) {
    return a.period === b.period
        ? period_seq(a) === period_seq(b)
            ? a.transaction_date === b.transaction_date
                ? 0
                : a.transaction_date < b.transaction_date
                ? -1
                : 1
            : period_seq(a) < period_seq(b)
            ? -1
            : 1
        : period(a) < period(b)
        ? -1
        : 1;
}

function period(t: Transactie) {
    const s = t.period.split('-');
    return `${s[1]}-${s[0]}`;
}

function period_seq(t: Transactie) {
    return t.period_seq || 1;
}
