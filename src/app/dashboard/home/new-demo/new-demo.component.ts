import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from '../../../services/http-call.service';
import { environment } from '../../../environments/environment';
import { SpinnerService } from '../../../services/spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ShowTemplateComponent } from '../show-template/show-template.component';

@Component({
  selector: 'app-new-demo',
  standalone: false,
  templateUrl: './new-demo.component.html',
  styleUrl: './new-demo.component.scss'
})
export class NewDemoComponent {
  templates: any;
  dialogRef: any;

  constructor(private router: Router, private httpCallService: HttpCallService, private spinner: SpinnerService,
      private snackbar: MatSnackBar, private dialog: MatDialog) {
        this.httpCallService.connect();
    }

  ngOnInit(): void {
    this.getAllTemplates();
  }

   getAllTemplates() {
    this.spinner.show("Loading...");
    this.httpCallService.getWithAuth(`${environment.api}/temp/chat-agent/all`).subscribe((res:any) => {
      this.spinner.hide();
      if (res['success']) {
        console.log(res);
        this.templates = res['systems'].slice(0,3);
      } else {
        this.snackbar.open(res?.message ? res.message : "Unknown Error Occured", "Close", {
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

  goToAddAgent() {
    this.router.navigate(['/add-new-agent']);
  }

  navigateToDeploy(item:any) {
    console.log(item);
    this.router.navigate(['/template-env'],{queryParams: {id: item.id, title: item.title, description: item.description }});
  }

  showTemplate(template:any) {
        this.dialogRef = this.dialog.open(ShowTemplateComponent, {
            disableClose: true,
            width: '300px',
            maxWidth: '300px',
            panelClass: 'transparent-dialog',
            data: { template },
          });
      }

}
