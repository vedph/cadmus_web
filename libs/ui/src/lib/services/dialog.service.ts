import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';

// https://medium.com/@tarik.nzl/making-use-of-dialogs-in-material-2-mddialog-7533d27df41

/**
 * This service acts as a wrapper for MatDialog to simplify the process of calling
 * the dialog and subscribing to it. What it will do is create an Instance of
 * MatDialog with our custom component (ConfirmDialogComponent). Then it will set
 * any public properties it needs to by setting the properties on the
 * componentInstance object. It will return the observable afterClosed()
 * to the caller so they can subscribe to it. This will emit an event whenever
 * the dialog is closed.
 */
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public confirm(title: string, prompt: string, ok = 'yes', cancel = 'no'):
    Observable<boolean> {

    let dialogRef: MatDialogRef<ConfirmDialogComponent>;

    dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.prompt = prompt;
    dialogRef.componentInstance.ok = ok;
    dialogRef.componentInstance.cancel = cancel;

    return dialogRef.afterClosed();
  }
}
