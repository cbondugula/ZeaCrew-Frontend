import { Component } from '@angular/core';
import { SpinnerService } from '../../../services/spinner.service';
import { HttpCallService } from '../../../services/http-call.service';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-template-env',
  standalone: false,
  templateUrl: './template-env.component.html',
  styleUrl: './template-env.component.scss'
})
export class TemplateEnvComponent {
  tools: any = [];
  selectedTool:any;
  id: any;
  title: any;
  description: any;


  constructor(private spinner: SpinnerService, private httpCallService: HttpCallService, private snackbar: MatSnackBar, private router: Router
    ,private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params:any)=>{
      this.id = params.id,
      this.title = params.title,
      this.description = params.description
    })
    this.getProviders();
    this.getAllTools();
  }

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

  getProviders(): void {
    this.httpCallService.getWithAuth(`${environment.api}/llms/get_all_llm_connections`).subscribe({
      next: (response) => {
        this.spinner.hide();
        if(response['success']) {
          this.llmProviders = response['connections'].map((item:any) => ({...item, providerName: () => {
            const index = this.llmProviders.findIndex((i:any) => i._id === item.provider );
            return this.llmProviders[index].provider;
          } }))
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
  selectedModel:any;
  llmProviders:any = [];

  onChangeProvider(e:any) {
    console.log(e);
  }

  onChangeModel (e:any) {
    console.log(e);
  }

  onChangeLLM(e:any) {
    console.log(e);
  }

  onDeploy(){
    const body = {
      "llms": [
        {
          "id": this.selectedProvider._id,
          "model": this.selectedModel
        }
      ],
      "tools": [
        {
          "id": this.selectedTool
        }
      ]
    }
    
    this.httpCallService.postWithAuth(`${environment.api}/temp/chat-agent/enrich-from-temp/${this.id}`, body).subscribe({
      next: (response) => {
        this.spinner.hide();
        if(response['success']) {
          this.router.navigate(['/home']);
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
