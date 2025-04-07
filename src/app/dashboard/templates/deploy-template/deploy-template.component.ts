import { Component, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';
import { AddTaskModalComponent } from './add-task-modal/add-task-modal.component';

@Component({
  selector: 'app-deploy-template',
  standalone: false,
  templateUrl: './deploy-template.component.html',
  styleUrl: './deploy-template.component.scss',
})
export class DeployTemplateComponent {
  constructor(private router: Router) {}
  @ViewChild('modal', { static: false }) modal!: AddTaskModalComponent;

  variableList = [
    {
      key: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
      value: ['Serper API', 'Open AI', 'More...'],
      status: 'OpenAI',
      action: 'edit',
    },
    {
      key: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
      value: ['Serper API', 'Open AI', 'More...'],
      status: 'Meta',
      action: 'edit',
    },
  ];

  openModal() {
    this.modal.open();
  }

  addNewAgent() {
    this.router.navigate(['/add-new-agent']);
  }
}
