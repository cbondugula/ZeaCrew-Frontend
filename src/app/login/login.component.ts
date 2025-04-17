import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpCallService } from '../services/http-call.service';
import { environment } from '../environments/environment';
import { SpinnerService } from '../services/spinner.service';

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
    private spinner: SpinnerService,
    private snackbar: MatSnackBar
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
    this.spinner.show("Loading...");
    this.loginData.email = this.signInForm.value.email;
    this.loginData.password = this.signInForm.value.password;

    this.isLoading = true;
    this.errorMessage = '';
    this.httpCallService.post(`${environment.api}/llms/auth/signin`, this.loginData).subscribe({
      next: (response) => {
        this.spinner.hide();
        if (response['success']) {
          this.isLoading = false;
          localStorage.setItem('token', response.access_token);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Login failed: ' + response.error;
          this.snackbar.open(response?.error ? response.error : "Unknown Error Occured","Close",{
            duration: 3000
          })
        }
      },
      error: (error) => {
        this.spinner.hide();
        this.isLoading = false;
        this.snackbar.open(error?.error?.error ? error.error?.error : "Unknown Error Occured","Close",{
          duration: 3000
        })
      },
      complete: () => {
        this.spinner.hide();
        this.isLoading = false;
      },
    });
  }
}
