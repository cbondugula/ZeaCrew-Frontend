import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from '../../../services/http-call.service';
import { environment } from '../../../environments/environment';
import { SpinnerService } from '../../../services/spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditTemplateComponent } from '../edit-template/edit-template.component';
import { ShowTemplateComponent } from '../show-template/show-template.component';

@Component({
  selector: 'app-new-created-template',
  standalone: false,
  templateUrl: './new-created-template.component.html',
  styleUrl: './new-created-template.component.scss'
})
export class NewCreatedTemplateComponent {
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
    this.httpCallService.getWithAuth(`${environment.api}/temp/chat-agent/enriched-all`).subscribe((res: any) => {
      if (res['success']) {
        console.log(res);
        this.templates = res['systems'];
        if(this.templates.length === 0) this.router.navigate(['/new-demo']);
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

   navigateToChat(temp: any) {
    this.router.navigate([`chat/${temp.id}`], { queryParams: { title: temp.title } });
  }

  goToAddAgent() {
    this.router.navigate(['/add-new-agent']);
  }

  onClickEditTemplate(template: any) {
      this.dialogRef = this.dialog.open(EditTemplateComponent, {
        disableClose: true,
        width: '70vw',
        maxWidth: '70vw',
        panelClass: 'transparent-dialog',
        data: { template },
      });
  
      this.dialogRef.afterClosed().subscribe((result: any) => {
        console.log(`Dialog result: ${result}`);
        this.getAllTemplates();
      });
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
