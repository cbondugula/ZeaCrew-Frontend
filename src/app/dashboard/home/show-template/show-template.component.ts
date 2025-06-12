import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-show-template',
  standalone: false,
  templateUrl: './show-template.component.html',
  styleUrl: './show-template.component.scss'
})
export class ShowTemplateComponent {
  template: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ShowTemplateComponent>) {
    const { template } = data;
    this.template = template;
  }
}
