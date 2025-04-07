import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpCallService } from '../services/http-call.service';
import { environment } from '../environments/environment';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  signInForm: FormGroup;
  isPasswordVisible: boolean = false;
  submitted: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  loginData = {
    email: '',
    password: '',
  };

  constructor(
    private httpCallService: HttpCallService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
      ]),
    });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    this.submitted = true;

    if (this.signInForm.invalid) {
      return;
    }

    this.loginData.email = this.signInForm.value.email;
    this.loginData.password = this.signInForm.value.password;

    this.isLoading = true;
    this.errorMessage = '';
    this.httpCallService.post(`${environment.api}/llms/auth/signin`, this.loginData).subscribe({
      next: (response) => {
        if (response['success']) {
          this.isLoading = false;
          localStorage.setItem('token', response.access_token);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Login failed: ' + response.error;
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error(this.loginData);
        console.error('Login failed:', error);

        const errorMessage =
          error?.error?.message || 'An unknown error occurred';

        this.errorMessage = errorMessage;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
