import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpinnerDialogComponent } from '../spinner-dialog/spinner-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private dialogRef?: MatDialogRef<any>;

  constructor(private dialog: MatDialog) {}

  show(message: string = 'Loading...'): void {
    if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(SpinnerDialogComponent, {
        disableClose: true,
        panelClass: 'transparent-dialog',
        data: { message },
      });
    }
  }

  hide(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = undefined;
    }
  }
}
