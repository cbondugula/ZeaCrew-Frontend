import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-role-modal',
  standalone: false,
  templateUrl: './add-role-modal.component.html',
  styleUrl: './add-role-modal.component.scss'
})
export class AddRoleModalComponent {
    @ViewChild('addRole', {static: false}) modal!: ElementRef;
    
  open() {
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }
}
