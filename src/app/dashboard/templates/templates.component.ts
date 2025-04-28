import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpCallService } from '../../services/http-call.service';
import { SpinnerService } from '../../services/spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-templates',
  standalone: false,
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss'
})
export class TemplatesComponent implements OnInit {
  onEditClick(arg0: any) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private httpCallService: HttpCallService,
    private router: Router,
    private spinner: SpinnerService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllTemplates();
  }

  cardList = [
    { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
  ];

  navigateToChild() {
    this.router.navigate(['/build-template']);
  }

  navigateToDeploy(item:any) {
    console.log(item);
    this.router.navigate(['/template-env'],{queryParams: {id: item.id, title: item.title, description: item.description }});
  }

  templates:any = [];

  getAllTemplates() {
    this.spinner.show("Loading...");
    this.httpCallService.getWithAuth(`${environment.api}/temp/chat-agent/all`).subscribe((res:any) => {
      this.spinner.hide();
      // this.templates = res;
      // 
      if (res['success']) {
        console.log(res);
        this.templates = res['systems'];
      } else {
        this.snackbar.open(res?.error ? res.error : "Unknown Error Occured", "Close", {
          duration: 3000
        })
      }
    },(err:any) => {
      this.spinner.hide();
      this.snackbar.open(err?.error?.message ? err.error.message : "Unknown Error Occured", "Close", {
        duration: 3000
      })
    })
  }


  onDeleteTemplate(id: string): void {
    this.spinner.show("Deleting template...");
    this.httpCallService.deleteWithAuth(`${environment.api}/temp/chat-agent/crew-run/${id}`).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res['success']) {
          this.snackbar.open("Template deleted successfully", "Close", {
            duration: 3000
          });
          this.getAllTemplates();
        } else {
          this.snackbar.open(res?.error ? res.error : "Unknown Error Occurred", "Close", {
            duration: 3000
          });
        }
      },
      (err: any) => {
        this.spinner.hide();
        this.snackbar.open(err?.error?.message ? err.error.message : "Unknown Error Occurred", "Close", {
          duration: 3000
        });
      }
    );
  }
  


}
