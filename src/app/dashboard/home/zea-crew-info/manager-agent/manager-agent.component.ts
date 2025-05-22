import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpCallService } from '../../../../services/http-call.service';
import { environment } from '../../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from '../../../../services/spinner.service';

@Component({
  selector: 'app-manager-agent',
  standalone: false,
  templateUrl: './manager-agent.component.html',
  styleUrl: './manager-agent.component.scss'
})
export class ManagerAgentComponent {
   agents:any = [];
   llms: any = [];
  
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ManagerAgentComponent>, 
  private httpCallService: HttpCallService, private snackbar: MatSnackBar, private spinner: SpinnerService) {
    this.getProviders();
    }

    agentName:any;
    role:any;
    goal:any;
    backstory:any;
    selectedModel:any;
    selectedProvider:any;
    selectedAgent:any;
    agentDescription:any;
    agentOutput:any;

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
  
    saveAgent() {
      this.dialogRef.close({
    "role": this.role,
    "goal": this.goal,
    "backstory": this.backstory,
    "llms": [
      {
        "id": this.selectedProvider._id,
        "model": this.selectedModel
      }
    ],
    "tools": [],
    "max_iterations": 1,
    "max_rpm": 10,
    "allow_delegation": true,
    "tasks": []
    });
    }
}
