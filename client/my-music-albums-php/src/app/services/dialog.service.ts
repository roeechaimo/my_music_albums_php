import { Observable } from 'rxjs/Rx';
import { DialogComponent } from '../components/dialog/dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {

    constructor(private dialog: MatDialog) { }

    public confirm(title: string, content: string): Observable<boolean> {

        let dialogRef: MatDialogRef<DialogComponent>;

        dialogRef = this.dialog.open(DialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.content = content;

        return dialogRef.afterClosed();
    }
}
