import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class ComponentsService {
    constructor(private readonly dialog: MatDialog) {}

    async confirm(title: string, message: string) {
        const dialogRef = this.dialog.open<ConfirmDialogComponent, ConfirmDialogData>(ConfirmDialogComponent, {
            maxWidth: 450,
            autoFocus: false,
            data: { title, message },
        });

        const result = await dialogRef.afterClosed().toPromise();
        return !!result;
    }

}

export interface ConfirmDialogData {
    title: string;
    message: string;
}
