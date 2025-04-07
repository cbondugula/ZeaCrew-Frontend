import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  variableList = [
    { key: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi, sed euismod ligula euismod ut. ', value: 'Marketing Manager', status: 'GPT-4o', tool: 'Serper', action: 'edit' },
    { key: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi, sed euismod ligula euismod ut. ', value: 'Marketing Manager', status: 'GPT-4o', tool: 'VPN', action: 'edit' },
    { key: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi, sed euismod ligula euismod ut. ', value: 'Marketing Manager', status: 'GPT-4o', tool: 'VPN', action: 'edit' }
  ];
}
