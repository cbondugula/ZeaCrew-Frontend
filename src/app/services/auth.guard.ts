import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  canActivate(): boolean {
    const token = this.getToken();
    if (token) {
      console.log('Token found:', token);
      return true;
    } else {
      console.log('Token not found. Redirecting to /login');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
