import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router) {}
  cardList = [
    { name: 'Enterprise-content-marketing-crew' },
    { name: 'Enterprise-sales-crew' },
    { name: 'Enterprise-program-crew' },
    { name: 'Cyber Security' },
    { name: 'Product Research' },
  ];
  goToAddAgent() {
    this.router.navigate(['/add-new-agent']);
  }
 
}
