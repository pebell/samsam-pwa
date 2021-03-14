import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-ngsw',
    templateUrl: './ngsw.component.html',
    styleUrls: ['./ngsw.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgswComponent implements OnInit {
    constructor() {}

    iframe = '<iframe width="100%" height="315" src="/ngsw/state" frameborder="0"></iframe>';

    ngOnInit(): void {}
}
