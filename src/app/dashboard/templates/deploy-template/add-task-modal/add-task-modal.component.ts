import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-task-modal',
  standalone: false,
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.scss'
})
export class AddTaskModalComponent {
  @ViewChild('myModal', {static: false}) modal!: ElementRef;

  open() {
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }

}
