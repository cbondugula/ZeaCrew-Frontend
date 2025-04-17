import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpCallService } from '../../../services/http-call.service';
import { SpinnerService } from '../../../services/spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-llm',
  standalone: false,
  templateUrl: './add-llm.component.html',
  styleUrl: './add-llm.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddLlmComponent implements OnInit {
  llmProviders: any = [];
  llmModels:any = [];

  constructor(private router: Router, private httpCallService: HttpCallService, private spinner:SpinnerService, private snackbar: MatSnackBar) {}

  ngOnInit() {
    this.getProviders();
  }

  goBack() {
    this.router.navigate(['/llm']);
  }

  getProviders(): void {
    this.spinner.show("Loading...");
      this.httpCallService.getWithAuth(`${environment.api}/llms/get_allowed_providers`).subscribe({
        next: (response) => {
          this.spinner.hide();
          if(response['success']) {
            this.llmProviders = response['providers'];
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

  selectedProvider:any;

  onChangeProvider(e:any){
    this.spinner.show("Loading...");
    console.log(e.value);
    this.selectedProvider = e.value;
    this.httpCallService.getWithAuth(`${environment.api}/llms/get_llm_models?id=${e.value}`).subscribe({
      next: (response) => {
        this.spinner.hide();
        if(response['success']) {
          this.llmModels = response['models'];
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

  selectedModels: string[] = [];
  key:any;
  value:any;
  name:any="";

  onCheckboxChange(event: any, model: string) {
    if (event.target.checked) {
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
      next: (response) => {
        this.spinner.hide();
        if(response['success']) {
          console.log(response);
          this.router.navigate(['/llm']);
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


}
