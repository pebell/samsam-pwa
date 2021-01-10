import { Component, Input, ElementRef, ViewChild, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { PortalUser } from '../../services/lid';

@Component({
    selector: 'app-buffer-bar',
    templateUrl: './buffer-bar.component.html',
    styleUrls: ['./buffer-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BufferBarComponent implements AfterViewInit {
    @Input() id!: string;
    @Input() lid!: PortalUser;
    @Input() bovenLabel!: string;
    @Input() onderLabel!: string;
    @Input() bovenValue!: number;
    @Input() onderValue!: number;
    @Input() shortIsProblem = 'true';
    @Input() shortColor = 'warn';
    @Input() shortStyle = 'animated';
    @Input() normalColor = 'accent';
    @Input() normalStyle = 'static';

    @ViewChild('bl') blElement!: ElementRef;
    @ViewChild(MatProgressBar) barElement!: MatProgressBar;
    @ViewChild('ol') olElement!: ElementRef;

    uiDone = false;

    constructor(private cdRef: ChangeDetectorRef) {}

    ngAfterViewInit() {
        this.uiDone = true;
        this.cdRef.detectChanges();
    }

    style2Mode(style: string) {
        return style === 'static' ? 'determinate' : 'buffer';
    }

    get barMode() {
        return this.style2Mode(this.isShort ? this.shortStyle : this.normalStyle);
    }

    get barColor() {
        return this.isShort ? this.shortColor : this.normalColor;
    }
    get barValue() {
        return this.ratio * 100;
    }

    get isShort() {
        return this.bovenValue < this.onderValue;
    }

    get ratio() {
        return this.isShort ? this.bovenValue / this.onderValue : this.onderValue / this.bovenValue;
    }

    get pixelpos() {
        return this.barElement._elementRef.nativeElement.clientWidth * this.ratio;
    }

    get bovenPosition() {
        const labelWidth = this.blElement.nativeElement.clientWidth + 50;
        if (this.onderValue === 0 && this.bovenValue === 0) {
            return labelWidth + 'px';
        }
        return this.isShort ? Math.max(this.pixelpos, labelWidth) + 'px' : '100%';
    }

    get onderPosition() {
        const labelWidth = this.olElement.nativeElement.clientWidth + 50;
        if (this.onderValue === 0 && this.bovenValue === 0) {
            return labelWidth + 'px';
        }
        return this.isShort ? '100%' : Math.max(this.pixelpos, labelWidth) + 'px';
    }

    get bovenBedrag() {
        return this.bovenValue;
    }

    get onderBedrag() {
        return this.onderValue;
    }
}
