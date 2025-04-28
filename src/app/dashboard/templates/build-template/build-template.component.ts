import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpCallService } from '../../../services/http-call.service';
import { SpinnerService } from '../../../services/spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-build-template',
  standalone: false,
  templateUrl: './build-template.component.html',
  styleUrl: './build-template.component.scss'
})
export class BuildTemplateComponent {

  constructor(private router: Router, private httpCallService: HttpCallService, private spinner: SpinnerService,
      private snackbar: MatSnackBar
    ) {}


  ngOnInit():void {
    this.getProviders();
    this.getAllTools();
  }

  llms:any = []

  getProviders(): void {
      this.httpCallService.getWithAuth(`${environment.api}/llms/get_all_llm_connections`).subscribe({
        next: (response) => {
          this.spinner.hide();
          if(response['success']) {
            this.llms = response['connections']
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
      }
    );
    }



  }


  
  

