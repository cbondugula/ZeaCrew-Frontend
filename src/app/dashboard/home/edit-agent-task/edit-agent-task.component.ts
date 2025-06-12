import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpCallService } from '../../../services/http-call.service';
import { environment } from '../../../environments/environment';
import { SpinnerService } from '../../../services/spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-agent-task',
  standalone: false,
  templateUrl: './edit-agent-task.component.html',
  styleUrl: './edit-agent-task.component.scss'
})
export class EditAgentTaskComponent {
  agent: any;
  edit: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditAgentTaskComponent>, private httpCallService: HttpCallService,
    private spinner: SpinnerService, private snackbar: MatSnackBar) {
    const { agent, edit } = data;
    this.agent = agent;
    this.edit = edit;
    console.log(data);
    this.getProviders();
    this.getAllTools();
  }

  llms: any = [];

  getProviders(): void {
    this.httpCallService.getWithAuth(`${environment.api}/llms/get_all_llm_connections`).subscribe({
      next: (response) => {
        this.spinner.hide();
        if (response['success']) {
          this.llms = response['connections'];
          console.log(this.llms);
          const matched = this.llms.find((llm: any) => llm._id === this.agent.selectedProvider?._id);
          if (matched) {
            this.agent.selectedProvider = matched;
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
        const matched = this.tools.find((tool: any) => tool.id === this.agent.selectedTools?.id);
        if (matched) {
          this.agent.selectedTools = matched;
        }
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

  selectedTask: any = 0;

  saveAgent() {
    this.dialogRef.close(this.agent);
  }
}
