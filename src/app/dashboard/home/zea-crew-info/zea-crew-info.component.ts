import { Component } from '@angular/core';
import { HttpCallService } from '../../../services/http-call.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from '../../../services/spinner.service';
import { environment } from '../../../environments/environment';
import { EditAgentTaskComponent } from '../edit-agent-task/edit-agent-task.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManagerAgentComponent } from './manager-agent/manager-agent.component';

@Component({
  selector: 'app-zea-crew-info',
  standalone: false,
  templateUrl: './zea-crew-info.component.html',
  styleUrl: './zea-crew-info.component.scss'
})
export class ZeaCrewInfoComponent {

  template:any;
  templateInfo:any;
  dialogRef: any;

  constructor(private httpCall: HttpCallService, private snackbar: MatSnackBar, 
    private spinner: SpinnerService, private dialog: MatDialog, private router: Router) {
    this.httpCall.currentData.subscribe((template:any)=>{
      console.log(template);
      this.template = template.agents;
      this.templateInfo = template.template;
    })
  }
  
  onEditIntegration(toolName: string): void {
    console.log('Editing tool:', toolName);
    // TODO: Add your edit logic
  }
// Called by (click)="onDeleteTool('Serper')" etc.
  onDeleteIntegration(toolName: string): void {
    console.log('Deleting tool:', toolName);
    // TODO: Add your delete logic
  }
  agents = [
    {
      name: 'Agent 1',
      tags: ['Serper API', 'OpenAI', 'More...'],
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever'
    },
    {
      name: 'Agent 2',
      tags: ['Serper API', 'OpenAI', 'More...'],
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever'
    }
  ];
  llmItems = [
    {
      name: 'GPT-4o',
      description: 'Lorem Ipsum is simply dummy text of the printing.',
      provider: 'Open AI',
      source: 'Lorem ipsum'
    },
    {
      name: 'GPT-4o',
      description: 'Lorem Ipsum is simply dummy text of the printing.',
      provider: 'Open AI',
      source: 'Lorem ipsum'
    }
  ];
  integrations = [
    {
      name: 'Slack',
      description: 'Activate crews directly within Slack with simple commands',
      icon: 'assets/images/slack.png',
      status: 'Connect',
      type: 'error'
    },
    {
      name: 'HubSpot',
      description: 'Automate crew activation with powerful HubSpot workflows',
      icon: 'assets/images/hubspot-icon.png',
      status: 'Open',
      type: 'default'
    }
  ];
  tools = [
    {
      name: 'Serper',
      value: '1234567890',
      type: 'default'
    },
    {
      name: 'VPN',
      value: '987654321',
      type: 'default'
    }
  ];

  onClickEditAgent(agent:any,edit:boolean) {
    this.dialogRef = this.dialog.open(EditAgentTaskComponent, {
      disableClose: true,
      width: '70vw',  
      maxWidth: '70vw',
      panelClass: 'transparent-dialog',
      data: { agent, edit },
    });
    
    this.dialogRef.afterClosed().subscribe((result:any) => {
      console.log(`Dialog result: ${result}`);
      console.log(result);
      const index = this.agents.findIndex((a:any)=>a.agentName === result.agentName);
      this.agents[index] = {...result};
    });
  }

  managerAgent:any;

  onClickManagerAgent(){
    this.dialogRef = this.dialog.open(ManagerAgentComponent, {
      disableClose: true,
      width: '70vw',  
      maxWidth: '70vw',
      panelClass: 'transparent-dialog',
    });
    
    this.dialogRef.afterClosed().subscribe((result:any) => {
      console.log(`Dialog result: ${result}`);
      console.log(result);
      this.managerAgent = result;
    });
  }

  hierarchical:any;
  sequential:any;

  onChangeButton(e:any,num:number) {
    console.log(e);
    if(num === 1) {
      if(e.checked) {
        this.hierarchical = false; 
        this.sequential = true;
      }else{
        this.hierarchical = false; 
        this.sequential = false;
      }
    }
    else  {
      if(e.checked) {
        if(this.template.length < 2) {
          this.snackbar.open("Minimum of two agents required to select hierarchical","Close",{
                duration: 3000
          });
          setTimeout(()=>{
            this.hierarchical = false; 
            this.sequential = false;
          },500)
          return;
        }
        this.onClickManagerAgent();
        this.hierarchical = true; 
        this.sequential = false;

      }else{
        this.hierarchical = false; 
        this.sequential = false;
      }
    }
  }

  onDeploy() {
        this.spinner.show("Loading...");
        const modifiedAgents:any = [];
        console.log(this.template);
        this.template.forEach((a:any) => {
          modifiedAgents.push({
            "agent": a.agentName,
            "role": a.role,
            "goal": a.goal,
          "backstory": a.backstory,
          "llms": [
            {
              "id": a.selectedProvider._id,
              "model": a.selectedLLM
            }
          ],
          "tools": [
            {
              "id": a.selectedTools.id
            }
          ],
          "max_iterations": 1,
          "max_rpm": 10,
          "allow_delegation": false,
          "tasks": [
            {
              "description": a.description,
              "expected_output": a.output,
              "agent_name": a.agentName
            }
          ]
          })
        })
        const body = {
          ...this.templateInfo,
          "llm_provider": this.template[0]['selectedProvider']['name'],
          "search_provider": this.template[0]['selectedTools']['name'],
          "agents": [...modifiedAgents]
        }
        if(this.sequential){
          this.httpCall.postWithAuth(`${environment.api}/temp/multi-agent-system/create`, body).subscribe({
            next: (response) => {
              this.spinner.hide();
              if (response['success']) {
                console.log(response);
                this.router.navigate(['/home']);
              } else {
                this.snackbar.open(response?.error ? response.error : "Unknown Error Occured","Close",{
                  duration: 3000
                })
              }
            },
            error: (error:any) => {
              this.spinner.hide();
              this.snackbar.open(error?.error?.error ? error.error?.error : "Unknown Error Occured","Close",{
                duration: 3000
              })
            },
            complete: () => {
              this.spinner.hide();
            },
          });
        }else{
          this.httpCall.postWithAuth(`${environment.api}/temp/multi-agent-system/create`, {...body,manager_agent:this.managerAgent}).subscribe({
            next: (response) => {
              this.spinner.hide();
              if (response['success']) {
                console.log(response);
                this.router.navigate(['/home']);
              } else {
                this.snackbar.open(response?.error ? response.error : "Unknown Error Occured","Close",{
                  duration: 3000
                })
              }
            },
            error: (error:any) => {
              this.spinner.hide();
              this.snackbar.open(error?.error?.error ? error.error?.error : "Unknown Error Occured","Close",{
                duration: 3000
              })
            },
            complete: () => {
              this.spinner.hide();
            },
          });
        }
  }
  
}
