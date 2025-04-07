import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AddRoleModalComponent } from './add-role-modal/add-role-modal.component';

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  @ViewChild('modal', { static: false }) modal!: AddRoleModalComponent;

  constructor(private router: Router) {}

  variableList = [
    { email: 'email@gmail.com', status: 'Active', action: 'edit' },
  ];

  openModal() {
    this.modal.open();
  }

  // addNewAgent() {
  //   this.router.navigate(['/add-role']);
  // }
}
