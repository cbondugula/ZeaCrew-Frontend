import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.scss'],
  imports: [CommonModule],
})
export class IntegrationsComponent {

  selectedIntegration: string = '';

  integrations = [
    {
      name: 'Slack',
      description: 'Activate crews directly within Slack with simple commands',
      icon: 'assets/slack.png',
      connected: true,
      hasError: true
    },
    {
      name: 'HubSpot',
      description: 'Automate crew activation with powerful HubSpot workflows',
      icon: 'assets/hubspot-icon.png',
      connected: true,
      hasError: false
    },
    {
      name: 'Zapier',
      description: 'Trigger crews and automate workflows with Zapier and CrewAI',
      icon: 'assets/zapier-icon.png',
      connected: false,
      hasError: false
    }
  ];

  addNewIntegration(): void {
    console.log('Add New Integration clicked');
    // Optional: trigger modal/dialog logic here
  }

  onEditIntegration(name: string): void {
    console.log('Editing integration:', name);
    // Optional: open modal with integration details
  }

  onDeleteIntegration(name: string): void {
    console.log('Deleting integration:', name);
    this.integrations = this.integrations.filter(i => i.name !== name);
  }

  connectIntegration(name: string): void {
    const integration = this.integrations.find(i => i.name === name);
    if (integration) {
      integration.connected = true;
      console.log(`${name} is now connected.`);
    }
  }

  hasErrorIntegration(): boolean {
    return this.integrations.some(i => i.hasError);
  }
}
