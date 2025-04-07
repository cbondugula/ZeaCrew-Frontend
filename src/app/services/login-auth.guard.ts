import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class loginAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  canActivate(): boolean {
    // const isDevMode = !environment.production;
    // if (isDevMode) {
    //   this.router.navigate(['/home']);
    //   return false;
    // }
    const token = this.getToken();
    if (token) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
