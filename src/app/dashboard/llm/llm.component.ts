import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from '../../services/http-call.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-llm',
  standalone: false,
  templateUrl: './llm.component.html',
  styleUrl: './llm.component.scss',
})
export class LlmComponent implements OnInit {
  providers: any[] = [];
  createdLLMs: any;
  llmProviders: any;

  constructor(
    private httpCallService: HttpCallService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProviders();
  }

  getAllProviders(): void {
    this.httpCallService.getWithAuth(`${environment.api}/llms/get_allowed_providers`).subscribe({
      next: (response) => {
        if(response['success']) {
          this.llmProviders = response['providers'];
          this.getProviders();
        }else {
          console.error('Error fetching providers', response);
        }
      },
      error: (error) => {
        console.error('Error fetching providers', error);
      },
    });
}

  getProviders(): void {
    this.httpCallService.getWithAuth(`${environment.api}/llms/get_all_llm_connections`).subscribe({
      next: (response) => {
        if(response['success']) {
          this.createdLLMs = response['connections'].map((item:any) => ({...item, providerName: () => {
            const index = this.llmProviders.findIndex((i:any) => i._id === item.provider );
            return this.llmProviders[index].provider;
          } }))
        }else {
          console.error('Error fetching providers', response);
        }
      },
      error: (error) => {
        console.error('Error fetching providers', error);
      },
    });
  }

  deleteLlm(id:string) {
    this.httpCallService.deleteWithAuth(`${environment.api}/llms/delete_llm_connection/${id}`).subscribe({
      next: (response) => {
        if(response['success']) {
          this.getProviders();
        } else {
          console.error('Error deleting LLM', response);
        }
      },
      error: (error) => {
        console.error('Error deleting LLM', error);
      },
    });
  }

  //-----------------
  openAddNewLLM() {
    this.router.navigate(['/add-new-llm']);
  }

  onClickEditLLM(item:any){
    this.router.navigate(['/edit-llm'], {
      queryParams: { q: JSON.stringify(item) }
    });      
  }

}
