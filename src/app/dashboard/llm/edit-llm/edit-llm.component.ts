import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpCallService } from '../../../services/http-call.service';

@Component({
  selector: 'app-edit-llm',
  standalone: false,
  templateUrl: './edit-llm.component.html',
  styleUrl: './edit-llm.component.scss'
})
export class EditLlmComponent {
   llmProviders: any = [];
    llmModels:any = [];
  
    constructor(private router: Router, private httpCallService: HttpCallService,private activatedRoute: ActivatedRoute) {}

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
        this.httpCallService.getWithAuth(`${environment.api}/llms/get_allowed_providers`).subscribe({
          next: (response) => {
            if(response['success']) {
              this.llmProviders = response['providers'];
            }else {
              console.error('Error fetching providers', response);
            }
          },
          error: (error) => {
            console.error('Error fetching providers', error);
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
            console.error('Error fetching providers', response);
          }
        },
        error: (error) => {
          console.error('Error fetching providers', error);
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
          if(response['success']) {
            console.log(response);
            this.router.navigate(['/llm']);
          }else {
            console.error('Error fetching providers', response);
          }
        },
        error: (error) => {
          console.error('Error fetching providers', error);
        },
      });
    }
}
