import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from '../../../services/http-call.service';
import { environment } from '../../../environments/environment';
import { SpinnerService } from '../../../services/spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { ShowTemplateComponent } from '../show-template/show-template.component';

@Component({
  selector: 'app-new-default-templates',
  standalone: false,
  templateUrl: './new-default-templates.component.html',
  styleUrl: './new-default-templates.component.scss'
})
export class NewDefaultTemplatesComponent implements OnInit {
  templates: any[] = [];
  paginatedTemplates: any[] = [];
  first: number = 0;
  rows: number = 6;
  totalRecords: number = 0;

  constructor(private router: Router, private httpCallService: HttpCallService, private spinner: SpinnerService,
    private snackbar: MatSnackBar, private dialog: MatDialog, private location:Location) {
    this.httpCallService.connect();
  }

  ngOnInit(): void {
    this.getAllTemplates();
  }

  getAllTemplates() {
    this.spinner.show();
    this.httpCallService
      .getWithAuth(`${environment.api}/temp/chat-agent/all?page=1&limit=${this.rows}`)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.templates = response.systems || [];
          this.totalRecords = response.total_items || 0;
          this.updatePaginatedTemplates();
          this.spinner.hide();
        },
        error: (error) => {
          console.error('Error fetching templates:', error);
          this.spinner.hide();
          this.snackbar.open('Error fetching templates', 'Close', {
            duration: 3000,
          });
        },
      });
  }

  updatePaginatedTemplates() {
    this.paginatedTemplates = this.templates;
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    const page = Math.floor(this.first / this.rows) + 1;
    
    this.spinner.show();
    this.httpCallService
      .getWithAuth(`${environment.api}/temp/chat-agent/all?page=${page}&limit=${this.rows}`)
      .subscribe({
        next: (response: any) => {
          this.templates = response.systems || [];
          this.totalRecords = response.total_items || 0;
          this.updatePaginatedTemplates();
          this.spinner.hide();
        },
        error: (error) => {
          console.error('Error fetching templates:', error);
          this.spinner.hide();
          this.snackbar.open('Error fetching templates', 'Close', {
            duration: 3000,
          });
        },
      });
  }

  navigateToDeploy(item:any) {
    console.log(item);
    this.router.navigate(['/template-env'],{queryParams: {id: item.id, title: item.title, description: item.description }});
  }

  navigateBack() {
    this.location.back();
  }

  dialogRef:any;

  showTemplate(template:any) {
    this.dialogRef = this.dialog.open(ShowTemplateComponent, {
      disableClose: true,
      width: '300px',
      maxWidth: '300px',
      panelClass: 'transparent-dialog',
      data: { template },
    });
  }

  createTemplate() {
    this.router.navigate(['/dashboard/new-created-template']);
  }
}
