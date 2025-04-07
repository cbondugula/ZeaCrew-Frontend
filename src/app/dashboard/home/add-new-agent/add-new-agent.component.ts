import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-agent',
  standalone: false,
  templateUrl: './add-new-agent.component.html',
  styleUrl: './add-new-agent.component.scss'
})
export class AddNewAgentComponent {
  constructor(private router: Router) {}
  variableList = [
    { key: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet', value: ['Serper API', 'Open AI', 'More...'], status: 'OpenAI', action: 'edit' },
    { key: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet', value: ['Serper API','Open AI', 'More...'], status: 'Meta', action: 'edit' }
  ];

  navigateToTasks() {
    this.router.navigate(['/tasks']);
  }
}
