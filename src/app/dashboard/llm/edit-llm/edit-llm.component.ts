import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpCallService } from '../../../services/http-call.service';
import { SpinnerService } from '../../../services/spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-llm',
  standalone: false,
  templateUrl: './edit-llm.component.html',
  styleUrl: './edit-llm.component.scss'
})
export class EditLlmComponent {
   llmProviders: any = [];
    llmModels:any = [];
  
    constructor(private router: Router, private httpCallService: HttpCallService,private activatedRoute: ActivatedRoute,private spinner: SpinnerService, private snackbar: MatSnackBar) {}

    currentLLM:any;

    ngOnInit() {
      this.getProviders();
      this.activatedRoute.queryParams.subscribe(params => {
        console.log(params);
        if (params['q']) {
          try {
            const item = JSON.parse(params['q']);
            console.log(item);
            this.name = item.name;
            this.onChangeProvider(item.provider);
            this.currentLLM = item;
            for(let key in item.envVariables){
              this.key = key;
              this.value = item.envVariables[key];
            }
            this.selectedModels = item.Models || [];
          } catch (e) {
            console.error('Invalid JSON in query param q', e);
          }
        }
      });
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
      this.selectedProvider = e;
      this.httpCallService.getWithAuth(`${environment.api}/llms/get_llm_models?id=${e}`).subscribe({
        next: (response) => {
          if(response['success']) {
            this.llmModels = response['models'];
          }else {
            this.snackbar.open(response?.error ? response?.error : "Unknown Error Occured","Close",{
              duration: 3000
            })
          }
        },
        error: (error) => {
          this.snackbar.open(error?.error?.error ? error.error?.error : "Unknown Error Occured","Close",{
            duration: 3000
          })
        },
      });
    }
  
    selectedModels: string[] = [];
    key:any;
    value:any;
    name:any;
  
    onCheckboxChange(event: any, model: string) {
      if (event.target.checked) {
        this.selectedModels.push(model);
      } else {
        this.selectedModels = this.selectedModels.filter(m => m !== model);
      }
    }
  
    onClickEditLLM(){
      this.spinner.show("Loading...");
      const body = {
        _id : this.currentLLM._id,
        name: this.name,
        provider: this.selectedProvider,
        envVariables : {
          [this.key] :  this.value
        },
        Models: this.selectedModels
      }
      this.httpCallService.putWithAuth(`${environment.api}/llms/edit_llm_connection`,body).subscribe({
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
