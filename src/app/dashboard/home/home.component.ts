import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from '../../services/http-call.service';
import { environment } from '../../environments/environment';
import { SpinnerService } from '../../services/spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditTemplateComponent } from './edit-template/edit-template.component';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  templates: any;
  constructor(private router: Router, private httpCallService: HttpCallService, private spinner: SpinnerService,
    private snackbar: MatSnackBar, private dialog: MatDialog) {
      this.httpCallService.connect();
  }

  isTemplate: boolean = true;

  goToAddAgent() {
    this.router.navigate(['/add-new-agent']);
  }

  ngOnInit(): void {
    this.getAllTemplates();
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
          this.snackbar.open(res?.message ? res.message : "Unknown Error Occurred", "Close", {
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

  navigateToChat(temp: any) {
    this.router.navigate([`chat/${temp.id}`], { queryParams: { title: temp.title } });
  }

  getAllTemplates() {
    this.httpCallService.getWithAuth(`${environment.api}/temp/chat-agent/enriched-all`).subscribe((res: any) => {
      if (res['success']) {
        console.log(res);
        this.templates = res['systems'];
      } else {
        this.snackbar.open(res?.message ? res.message : "Unknown Error Occured", "Close", {
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

  dialogRef:any;

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

}
