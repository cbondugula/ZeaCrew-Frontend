import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menuItems = [
    { name: 'Home', route: '/home' },
    { name: 'LLM', route: '/llm' },
    { name: 'Integrations', route: '/home' },
    { name: 'Tools', route: '/tools' },
    { name: 'Environment Variables', route: '/environment-variables' },
    { name: 'Templates', route: '/templates' },
    { name: 'Usage', route: '/usage' },
    { name: 'Billing', route: '/billing' },
    { name: 'Settings', route: '/settings' },
  ];
  selectedItem = this.menuItems[0];
  @Output() contentChange = new EventEmitter<string>();

  constructor(private router: Router) {
    console.log('Navigating to /home on load');
    this.router.navigate(['/home']);
  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.router.navigate([item.route]);
  }
}
