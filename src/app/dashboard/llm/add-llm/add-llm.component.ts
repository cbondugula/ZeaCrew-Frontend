import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpCallService } from '../../../services/http-call.service';

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

  constructor(private router: Router, private httpCallService: HttpCallService) {}

  ngOnInit() {
    this.getProviders();
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
    console.log(e.value);
    this.selectedProvider = e.value;
    this.httpCallService.getWithAuth(`${environment.api}/llms/get_llm_models?id=${e.value}`).subscribe({
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
  name:any="";

  onCheckboxChange(event: any, model: string) {
    if (event.target.checked) {
      this.selectedModels.push(model);
    } else {
      this.selectedModels = this.selectedModels.filter(m => m !== model);
    }
  }

  onClickCreateLLM(){
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
