import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-templates',
  standalone: false,
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss'
})
export class TemplatesComponent {
  constructor(private router: Router) {}
  cardList = [
    { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
  ];

  navigateToChild() {
    this.router.navigate(['/build-template']);
  }

  navigateToDeploy() {
    this.router.navigate(['/deploy-template']);
  }
}
