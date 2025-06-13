import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpCallService } from '../../../services/http-call.service';
import { environment } from '../../../environments/environment';
import { SpinnerService } from '../../../services/spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-template',
  standalone: false,
  templateUrl: './edit-template.component.html',
  styleUrl: './edit-template.component.scss'
})
export class EditTemplateComponent {
  agents: any;
  template: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditTemplateComponent>, private httpCallService: HttpCallService,
    private spinner: SpinnerService, private snackbar: MatSnackBar, private cdr: ChangeDetectorRef) {
    const { template } = data;
    this.template = template;
    console.log(template);
    this.agents = template.agents;
    this.getProviders();
    this.getAllTools();
  }

  llms: any = [];
  providersFetched: boolean = false;
  toolsFetched: boolean = false;

  getProviders(): void {
    this.httpCallService.getWithAuth(`${environment.api}/llms/get_all_llm_connections`).subscribe({
      next: (response) => {
        this.spinner.hide();
        if (response['success']) {
          this.llms = response['connections'];
          console.log(this.llms);
          if (this.toolsFetched) {
            if (this.template.enum === 'DEFAULT') this.initializeProviderAndTools();
             else {
              if(this.template.manager_agent) this.initializeManagerAgent();
            }
            this.toolsFetched = false;
            this.providersFetched = false;
          } else {
            this.providersFetched = true;
          }
        } else {
          this.snackbar.open(response?.error ? response?.error : "Unknown Error Occured", "Close", {
            duration: 3000
          })
        }
      },
      error: (error) => {
        this.spinner.hide();
        this.snackbar.open(error?.error?.error ? error.error?.error : "Unknown Error Occured", "Close", {
          duration: 3000
        })
      },
    });
  }

  tools: any = [];

  getAllTools() {
    this.spinner.show("Loading....");
    this.httpCallService.getWithAuth(`${environment.api}/tls/tools`).subscribe((res: any) => {
      this.spinner.hide();
      if (res['success']) {
        console.log(res);
        this.tools = res['tools'];
        if (this.providersFetched) {
          if (this.template.enum === 'DEFAULT') this.initializeProviderAndTools();
          else {
            if(this.template.manager_agent) this.initializeManagerAgent();
          }
          this.providersFetched = false;
          this.toolsFetched = false;
        } else {
          this.toolsFetched = true;
        }
      } else {
        this.snackbar.open(res?.message ? res.message : "Unknown Error Occured", "Close", {
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

  selectedAgent: any;
  selectedProvider: any;
  selectedLLM: any;
  selectedTools: any;
  selectedIntegration: any = 'Slack';
  selectedManagerProvider: any;
  selectedManagerLLM: any;

  onChangeAgent(e: any) {
    console.log(this.llms);
    console.log(this.selectedAgent);
    const matched1 = this.llms.find((llm: any) => llm._id === this.selectedAgent.llms[0]?.id);
    if (matched1) {
      this.selectedProvider = matched1;
    }
    console.log(this.selectedProvider);
    this.selectedLLM = this.selectedAgent.llms[0].model;
    console.log(this.selectedLLM);
    const matched2 = this.tools.find((tool: any) => tool.id === this.selectedAgent.tools[0]?.id);
    console.log(matched2);
    if (matched2) {
      this.selectedTools = matched2;
    }
  }

  initializeProviderAndTools() {
    console.log(this.llms);
    console.log(this.template);
    console.log(this.tools);
    const matched1 = this.llms.find((llm: any) => llm._id === this.template.agents[0].llms[0].id);
    if (matched1) {
      this.selectedProvider = matched1;
      console.log(this.selectedProvider)
    }
    this.selectedLLM = this.template.agents[0].llms[0].model;
    const matched2 = this.tools.find((tool: any) => tool.id === this.template.agents[0].tools[0].id);
    console.log(matched2);
    if (matched2) {
      this.selectedTools = matched2;
    }
  }

  initializeManagerAgent(){
    const matched1 = this.llms.find((llm: any) => llm._id === this.template.manager_agent.llms[0].id);
      if (matched1) {
        this.selectedManagerProvider = matched1;
      }
      this.selectedManagerLLM = this.selectedManagerProvider.Models.find((item:string) => item == this.template.manager_agent.llms[0].model);
      console.log(this.template.manager_agent);
      console.log(this.selectedManagerProvider);
      console.log(this.selectedManagerLLM);
  }

  saveAgent() {
    const index = this.agents.findIndex((item: any) => item.agent_id === this.selectedAgent.agent_id);
    this.agents[index] = { ...this.agents[index], llms: [{ id: this.selectedProvider._id, model: this.selectedLLM }], tools: [{ id: this.selectedTools.id }] }
    this.selectedAgent = null;
    this.selectedProvider = null;
    this.selectedLLM = null;
    this.selectedTools = null;
  }

  saveTemplate() {
    if (this.template.enum === 'CUSTOM') {
      const body = { ...this.template, "agents": this.agents, ...(this.template.manager_agent && { manager_agent: { ...this.template.manager_agent, llms: [{ id: this.selectedManagerProvider._id, model: this.selectedManagerLLM }] } }) };
      this.httpCallService.putWithAuth(`${environment.api}/temp/multi-agent-system/edit/${this.template.id}`, body).subscribe({
        next: (response) => {
          this.spinner.hide();
          if (response['success']) {
            console.log(response);
            this.snackbar.open("Template updated successfully", "Info", {
              duration: 3000
            })
          } else {
            this.snackbar.open(response?.error ? response.error : "Unknown Error Occured", "Close", {
              duration: 3000
            })
          }
        },
        error: (error: any) => {
          this.spinner.hide();
          this.snackbar.open(error?.error?.error ? error.error?.error : "Unknown Error Occured", "Close", {
            duration: 3000
          })
        },
        complete: () => {
          this.spinner.hide();
          this.dialogRef.close();
        },
      });
    } else {
      const body = {
        "enum": "DEFAULT",
        "agents": [{
          "llms": [
            {
              "id": this.selectedProvider._id,
              "model": this.selectedLLM
            }
          ],
          "tools": [{ id: this.selectedTools.id }]
        }]
      }
      this.httpCallService.putWithAuth(`${environment.api}/temp/multi-agent-system/edit/${this.template.id}`, body).subscribe({
        next: (response) => {
          this.spinner.hide();
          if (response['success']) {
            console.log(response);
            this.snackbar.open("Template updated successfully", "Info", {
              duration: 3000
            })
          } else {
            this.snackbar.open(response?.error ? response.error : "Unknown Error Occured", "Close", {
              duration: 3000
            })
          }
        },
        error: (error: any) => {
          this.spinner.hide();
          this.snackbar.open(error?.error?.error ? error.error?.error : "Unknown Error Occured", "Close", {
            duration: 3000
          })
        },
        complete: () => {
          this.spinner.hide();
          this.dialogRef.close();
        },
      });
    }
  }
}
