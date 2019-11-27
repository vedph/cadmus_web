import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// https://medium.com/@tarik.nzl/making-use-of-dialogs-in-material-2-mddialog-7533d27df41

@Component({
  // https://github.com/angular/components/issues/7718
  // selector: 'cadmus-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  public title: string;
  public prompt: string;
  public ok: string;
  public cancel: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = 'Confirm';
    this.prompt = 'Confirm operation?';
    this.ok = 'yes';
    this.cancel = 'no';
  }

  ngOnInit() {}
}
