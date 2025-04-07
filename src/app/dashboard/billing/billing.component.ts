import { Component } from '@angular/core';

@Component({
  selector: 'app-billing',
  standalone: false,
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})
export class BillingComponent {
  activeTab: string = 'Monthly Billing';

  changeTab(tab: string) {
    this.activeTab = tab;
  }
}
