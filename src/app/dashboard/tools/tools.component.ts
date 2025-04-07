import { Component } from '@angular/core';

@Component({
  selector: 'app-tools',
  standalone: false,
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent {

  // This method is called by (click)="navigateTomodel()"
  navigateTomodel(): void {
    console.log('Navigating to model...');
    // TODO: Add real navigation or modal logic
  }

  // Called by (click)="onEditTool('Serper')" etc.
  onEditTool(toolName: string): void {
    console.log('Editing tool:', toolName);
    // TODO: Add your edit logic
  }

  // Called by (click)="onDeleteTool('Serper')" etc.
  onDeleteTool(toolName: string): void {
    console.log('Deleting tool:', toolName);
    // TODO: Add your delete logic
  }
}
