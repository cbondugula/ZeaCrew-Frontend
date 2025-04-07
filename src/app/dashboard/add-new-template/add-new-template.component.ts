import { Component } from '@angular/core';

@Component({
  selector: 'app-add-new-template',
  standalone: false,
  templateUrl: './add-new-template.component.html',
  styleUrl: './add-new-template.component.scss'
})
export class AddNewTemplateComponent {
  agentName: string = '';
  agentType: string = 'Agent1';
  goal: string = '';
  backstory: string = '';
  selectedLLM: string = 'GPT-4o';
  selectedIntegration: string = 'Slack';
  selectedTools: string = 'Serper';

  saveTemplate() {
    console.log('Template Saved:', {
      agentName: this.agentName,
      agentType: this.agentType,
      goal: this.goal,
      backstory: this.backstory,
      selectedLLM: this.selectedLLM,
      selectedIntegration: this.selectedIntegration,
      selectedTools: this.selectedTools
    });
  }
}



