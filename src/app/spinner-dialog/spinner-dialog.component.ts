import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-spinner-dialog',
  standalone: false,
  templateUrl: './spinner-dialog.component.html',
  styleUrl: './spinner-dialog.component.scss'
})
export class SpinnerDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
