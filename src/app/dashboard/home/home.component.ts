import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  cardList = [
    { name: 'Enterprise-content-marketing-crew' },
    { name: 'Enterprise-sales-crew' },
    { name: 'Enterprise-program-crew' },
    { name: 'Cyber Security' },
    { name: 'Product Research' },
  ];
}
