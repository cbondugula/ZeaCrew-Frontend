import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-agent',
  standalone: false,
  templateUrl: './edit-agent.component.html',
  styleUrl: './edit-agent.component.scss'
})
export class EditAgentComponent { 

  agents:any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditAgentComponent>) {
    const {agent} = data;
    this.agents.push(agent);
    this.selectedAgent = agent;
    this.agentDescription = agent.description;
    this.agentOutput = agent.output;
    console.log(data);
  }

  selectedAgent:any;
  agentDescription:any;
  agentOutput:any;

  saveAgent() {
    this.dialogRef.close({...this.data.agent,description: this.agentDescription, output: this.agentOutput});
  }
}
