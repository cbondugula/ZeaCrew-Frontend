import { Component } from '@angular/core';

@Component({
  selector: 'app-environment-variables',
  standalone: false,
  templateUrl: './environment-variables.component.html',
  styleUrl: './environment-variables.component.scss'
})
export class EnvironmentVariablesComponent {
  variableList = [
    { key: 'open_ai', value: 'openai_key', status: 'active', action: 'edit' },
    { key: 'open_ai', value: 'openai_key', status: 'error', action: 'edit' }
  ];
}
