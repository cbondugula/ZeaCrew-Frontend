import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { SpinnerService } from '../../../services/spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpCallService } from '../../../services/http-call.service';
import { environment } from '../../../environments/environment';
declare var bootstrap: any;

@Component({
  selector: 'app-new-tools',
  standalone: false,
  templateUrl: './new-tools.component.html',
  styleUrl: './new-tools.component.scss'
})
export class NewToolsComponent {
  isLoading: boolean = false;
    errorMessage: string = '';
    @ViewChild('modalRef') modalRef!: ElementRef;
  
    toolData = {
      id: '',
      name: '',
      api_key: '',
      website_url: '',
      type: ''
    };
    selectedToolId: string = '';
  
    constructor(
      private httpCallService: HttpCallService,
      private router: Router,
      private spinner: SpinnerService,
      private snackbar: MatSnackBar
    ) { }
  
    ngOnInit(): void {
      this.getAllTools();
      this.getAllExistingTools();
    }
  
    // This method is called by (click)="navigateTomodel()"
    navigateTomodel(): void {
      console.log('Navigating to model...');
      // TODO: Add real navigation or modal logic
    }
  
    tools: any = [];
  
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

    onChangeTool(e:any){
      console.log(e.target.value);
      let temp = this.existingTools.find((tool:any) => tool.name === e.target.value);
      this.toolData.type = temp.type;
      this.toolData.id = temp.id;
    }

    existingTools:any = [];

    getAllExistingTools(){
      this.httpCallService.getWithAuth(`${environment.api}/tls/get_toolsnames`).subscribe((res: any) => {
        this.spinner.hide();
        if (res['success']) {
          console.log(res);
          this.existingTools = res['tools'];
          this.toolData.type = res['tools'][0].type;
          this.toolData.id = res['tools'][0].id;
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

    onEditClick(tool: any): void {
      this.toolData.name = tool.name;
      this.toolData.api_key = tool.api_key;
      this.toolData.id = tool.id;
      this.toolData.type = tool.type;
      this.selectedToolId = tool.id;
      this.toolData.website_url = tool.website_url;
    }
  
    async onAddTool() {
      console.log(this.toolData);
      this.spinner.show("Loading...");
  
      this.isLoading = true;
      this.errorMessage = '';
      this.httpCallService.postWithAuth(`${environment.api}/tls/tools`, this.toolData).subscribe({
        next: (response) => {
          this.spinner.hide();
          if (response['success']) {
            console.log("Successfully added the tools")
            this.isLoading = false;
            this.getAllTools();
          } else {
            this.errorMessage = 'Login failed: ' + response.error;
            this.snackbar.open(response?.error ? response.error : "Unknown Error Occured", "Close", {
              duration: 3000
            })
          }
        },
        error: (error) => {
          this.spinner.hide();
          this.isLoading = false;
          this.snackbar.open(error?.error?.error ? error.error?.error : "Unknown Error Occured", "Close", {
            duration: 3000
          })
        },
        complete: () => {
          this.spinner.hide();
          this.isLoading = false;
        },
      });
    }
  
  
  
    // Called by (click)="onEditTool('Serper')" etc.
    onEditTool(): void {
      console.log('Editing tool:', this.selectedToolId);
      console.log(this.toolData)
      this.spinner.show("Loading....");
      this.httpCallService.putWithAuth(`${environment.api}/tls/tools/${this.selectedToolId}`, this.toolData).subscribe((res: any) => {
        this.spinner.hide();
        var myModal = new bootstrap.Modal(document.getElementById('#editToolsModal'), {});
        myModal.hide();
        if (res['success']) {
          console.log("edit is successfully completed..");
          this.getAllTools();
          // this.router.navigate(['/home']);
        } else {
          console.log("response : ", res)
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
  
    // Called by (click)="onDeleteTool('Serper')" etc.
    onDeleteTool(id: string): void {
  
      this.spinner.show("Loading....");
      this.httpCallService.deleteWithAuth(`${environment.api}/tls/tools/${id}`).subscribe((res: any) => {
        this.spinner.hide();
        if (res['success']) {
          console.log(res);
          this.getAllTools();
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
}
