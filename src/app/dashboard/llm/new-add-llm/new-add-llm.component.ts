import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpCallService } from '../../../services/http-call.service';
import { SpinnerService } from '../../../services/spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-add-llm',
  standalone: false,
  templateUrl: './new-add-llm.component.html',
  styleUrl: './new-add-llm.component.scss'
})
export class NewAddLlmComponent {

    llmProviders: any = [];
    llmModels:any = [];
  
    constructor(private router: Router, private httpCallService: HttpCallService, private spinner:SpinnerService, private snackbar: MatSnackBar, private location: Location) {}
  
    ngOnInit() {
      this.getProviders();
    }
  
    goBack() {
      this.router.navigate(['/llm']);
    }
  
    getProviders(): void {
      this.spinner.show("Loading...");
        this.httpCallService.getWithAuth(`${environment.api}/llms/get_allowed_providers`).subscribe({
          next: (response:any) => {
            this.spinner.hide();
            if(response['success']) {
              this.llmProviders = response['providers'];
            }else {
              this.snackbar.open(response?.error ? response?.error : "Unknown Error Occured","Close",{
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
        });
    }
  
    selectedProvider:any;
  
    onChangeProvider(e:any){
      this.spinner.show("Loading...");
      console.log(e.value);
      this.selectedProvider = e.value;
      this.httpCallService.getWithAuth(`${environment.api}/llms/get_llm_models?id=${e.value}`).subscribe({
        next: (response:any) => {
          this.spinner.hide();
          if(response['success']) {
            this.llmModels = response['models'];
          }else {
            this.snackbar.open(response?.error ? response?.error : "Unknown Error Occured","Close",{
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
      });
    }
  
    selectedModels: string[] = [];
    key:any;
    value:any;
    name:any="";
  
    onCheckboxChange(event: any, model: string) {
      if (event.checked) {
        this.selectedModels.push(model);
      } else {
        this.selectedModels = this.selectedModels.filter(m => m !== model);
      }
    }
  
    onClickCreateLLM(){
      this.spinner.show("Loading...");
      const body = {
        name: this.name,
        provider: this.selectedProvider,
        envVariables : {
          [this.key] :  this.value
        },
        Models: this.selectedModels
      }
      this.httpCallService.postWithAuth(`${environment.api}/llms/add_llm_connection`,body).subscribe({
        next: (response:any) => {
          this.spinner.hide();
          if(response['success']) {
            console.log(response);
            this.router.navigate(['/new-llm']);
          }else {
            this.snackbar.open(response?.error ? response?.error : "Unknown Error Occured","Close",{
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
      });
    }

  navigateBack() {
    this.location.back();
  }
}
