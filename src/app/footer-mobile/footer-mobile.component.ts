import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-footer-mobile',
    templateUrl: './footer-mobile.component.html',
    styleUrls: ['./footer-mobile.component.scss'],
})
export class FooterMobileComponent implements OnInit {
    @Output() public sidenavToggle = new EventEmitter();

    constructor(public readonly app: AppService) {}

    ngOnInit(): void {}

    onToggleSidenav = () => {
        this.sidenavToggle.emit();
    };

    ngsw() {
        console.log('hier');
        window.location.href = '/ngsw/state';
    }
}
