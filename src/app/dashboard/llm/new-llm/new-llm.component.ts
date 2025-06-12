import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from '../../../services/http-call.service';
import { environment } from '../../../environments/environment';
import { SpinnerService } from '../../../services/spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-llm',
  standalone: false,
  templateUrl: './new-llm.component.html',
  styleUrl: './new-llm.component.scss'
})
export class NewLlmComponent {
  providers: any[] = [];
  createdLLMs: any;
  llmProviders: any;

  constructor(
    private httpCallService: HttpCallService,
    private router: Router,
    private spinner: SpinnerService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllProviders();
  }

  getAllProviders(): void {
    this.spinner.show("Loading...")
    this.httpCallService.getWithAuth(`${environment.api}/llms/get_allowed_providers`).subscribe({
      next: (response) => {
        if(response['success']) {
          this.llmProviders = response['providers'];
          this.getProviders();
        }else {
          this.spinner.hide();
          this.snackbar.open(response.error ? response?.error : "Unknown Error Occured","Close",{
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

  getProviders(): void {
    this.httpCallService.getWithAuth(`${environment.api}/llms/get_all_llm_connections`).subscribe({
      next: (response) => {
        this.spinner.hide();
        if(response['success']) {
          this.createdLLMs = response['connections'].map((item:any) => ({...item, providerName: () => {
            const index = this.llmProviders.findIndex((i:any) => i._id === item.provider );
            console.log(index);
            return this.llmProviders[index]?.provider ? this.llmProviders[index].provider : "Unknown";
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

  deleteLlm(id:string) {
    this.spinner.hide();
    this.httpCallService.deleteWithAuth(`${environment.api}/llms/delete_llm_connection/${id}`).subscribe({
      next: (response) => {
        this.spinner.hide();
        if(response['success']) {
          this.getProviders();
        } else {
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

  openAddNewLLM() {
    this.router.navigate(['/new-add-llm']);
  }

  onClickEditLLM(item:any){
    this.router.navigate(['/edit-llm'], {
      queryParams: { q: JSON.stringify(item) }
    });      
  }
}
