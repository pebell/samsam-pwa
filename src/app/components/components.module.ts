import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxSherlockModule } from '@politie/ngx-sherlock';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PullToRefreshComponent } from './pull-to-refresh/pull-to-refresh.component';
import { BufferBarComponent } from './buffer-bar/buffer-bar.component';

@NgModule({
    declarations: [ConfirmDialogComponent, PullToRefreshComponent, BufferBarComponent],
    exports: [PullToRefreshComponent, BufferBarComponent],
    imports: [CommonModule, NgxSherlockModule, MatIconModule, MatProgressBarModule, MatDialogModule, MatButtonModule, MatProgressBarModule],
})
export class ComponentsModule {}
