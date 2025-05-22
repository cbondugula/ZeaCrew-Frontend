import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpCallService } from '../../../services/http-call.service';
import { SpinnerService } from '../../../services/spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditAgentComponent } from './edit-agent/edit-agent.component';

@Component({
  selector: 'app-add-new-agent',
  standalone: false,
  templateUrl: './add-new-agent.component.html',
  styleUrl: './add-new-agent.component.scss'
})
export class AddNewAgentComponent {
  constructor(private router: Router, private httpCallService: HttpCallService, private spinner: SpinnerService,
        private snackbar: MatSnackBar, private dialog: MatDialog,
      ) {}
  
  
    ngOnInit():void {
      this.getProviders();
      this.getAllTools();
    }

    title:any ;
    description:any;
    llms:any = [];
    selectedProvider:any;
    selectedModel:any;
    selectedTab = 'Info';

  
    getProviders(): void {
        this.httpCallService.getWithAuth(`${environment.api}/llms/get_all_llm_connections`).subscribe({
          next: (response) => {
            this.spinner.hide();
            if(response['success']) {
              this.llms = response['connections'];
              console.log(this.llms);
            }else {
              this.snackbar.open(response?.error ? response?.error : "Unknown Error Occured","Close",{
                duration: 3000
              })
            }
          },
          error: (error) => {
            this.spinner.hide();
            this.snackbar.open(error?.error?.error ? error.error?.error : "Unknown Error Occured","Close",{
              duration: 3000
            })
          },
        });
      }
  
      tools:any = [];
  
      getAllTools() {
        this.spinner.show("Loading....");
        this.httpCallService.getWithAuth(`${environment.api}/tls/tools`).subscribe((res: any) => {
          this.spinner.hide();
          if (res['success']) {
            console.log(res);
            this.tools = res['tools'];
          } else {
            this.snackbar.open(res?.error ? res.error : "Unknown Error Occured", "Close", {
              duration: 3000
            })
          }
        }, (err: any) => {
          this.spinner.hide();
          this.snackbar.open(err?.error?.message ? err.error.message : "Unknown Error Occured", "Close", {
            duration: 3000
          })
        })
      }
  
      agentName: any ;
      agentType: any;
      goal: any;
      backstory: any;
      selectedIntegration: any;
      selectedTools:any;
      role:any;

      templateDetails:any;

      agents:any = [];

      saveTitle() {
        this.templateDetails = {
          title: this.title,
          description: this.description
        }
        this.selectedTab = 'Add Agent';
      }

      navigateToTask() {
        this.selectedTab = 'Tasks';
      }
    
      saveTemplate() {

        this.agents.push({
          agentName: this.agentName,
          agentType: this.agentType,
          goal: this.goal,
          backstory: this.backstory,
          selectedProvider: this.selectedProvider,
          selectedLLM: this.selectedModel,
          selectedIntegration: this.selectedIntegration,
          selectedTools: this.selectedTools,
          role: this.role
        })
        console.log(this.agents);
        this.agentName = "";
        this.goal = "";
        this.backstory = "";
        this.selectedProvider = "";
        this.selectedModel = "";
        this.selectedIntegration = "";
        this.selectedTools = "";
        this.role = "";
        this.agentType = "";
      }

      selectedAgent:any;
      agentDescription:any;
      agentOutput:any;

      saveAgent(){
        const index = this.agents.findIndex((a:any)=>a.agentName === this.selectedAgent.agentName);
        this.agents[index] = {...this.agents[index],description: this.agentDescription, output: this.agentOutput};
        this.agentOutput = '';
        this.agentDescription = '';
      }

      onDeleteAgent(agent:any) {
        const index = this.agents.findIndex((a:any)=>a.agentName === agent.agentName);
        this.agents[index] = {...this.agents[index],description: null, output: null};
      }

      dialogRef:any;

      onEditAgent(agent:any) {
        this.dialogRef = this.dialog.open(EditAgentComponent, {
          disableClose: true,
          panelClass: 'transparent-dialog',
          data: { agent },
        });

        this.dialogRef.afterClosed().subscribe((result:any) => {
          console.log(`Dialog result: ${result}`);
          console.log(result);
          const index = this.agents.findIndex((a:any)=>a.agentName === result.agentName);
          this.agents[index] = {...result};
        });
      }

      next() {
        this.httpCallService.sendTemplateData({agents:this.agents,template: this.templateDetails});
        this.router.navigate(['crew-info']);
      }
}
