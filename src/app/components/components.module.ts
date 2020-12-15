import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxSherlockModule } from '@politie/ngx-sherlock';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';


@NgModule({
    declarations: [ConfirmDialogComponent],
    imports: [CommonModule, NgxSherlockModule, MatIconModule, MatProgressBarModule, MatDialogModule, MatButtonModule],
})
export class ComponentsModule {}
