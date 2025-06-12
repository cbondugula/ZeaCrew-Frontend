import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from '../../../services/http-call.service';
import { environment } from '../../../environments/environment';
import { SpinnerService } from '../../../services/spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-default-templates',
  standalone: false,
  templateUrl: './new-default-templates.component.html',
  styleUrl: './new-default-templates.component.scss'
})
export class NewDefaultTemplatesComponent {

  templates: any;

  constructor(private router: Router, private httpCallService: HttpCallService, private spinner: SpinnerService,
    private snackbar: MatSnackBar, private dialog: MatDialog, private location:Location) {
    this.httpCallService.connect();
  }

  ngOnInit(): void {
    this.getAllTemplates();
  }

  getAllTemplates() {
    this.spinner.show("Loading...");
    this.httpCallService.getWithAuth(`${environment.api}/temp/chat-agent/all`).subscribe((res: any) => {
      this.spinner.hide();
      if (res['success']) {
        console.log(res);
        this.templates = res['systems'];
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

  navigateToDeploy(item:any) {
    console.log(item);
    this.router.navigate(['/template-env'],{queryParams: {id: item.id, title: item.title, description: item.description }});
  }

  navigateBack() {
    this.location.back();
  }
}
