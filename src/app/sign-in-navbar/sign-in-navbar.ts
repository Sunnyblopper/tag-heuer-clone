import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Login } from '../login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-navbar',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in-navbar.html',
  styleUrl: './sign-in-navbar.css',
})
export class SignInNavbar {
  signInForm: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private loginService: Login,
    private router: Router
  ) {
    // Initialize the form with validation
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // Toggle the password visibility
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // Form submission
  onSubmit(): void {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      this.loginService.login({ email, password })?.subscribe(
        (response: any) => {
          console.log('Login successful:', response.data);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('loginedUser', JSON.stringify(response.data.user));
          this.router.navigate(['/user']);
        },
        (error: any) => {
          console.error('Login error:', error);
        }
      );
    } else {
      this.markFormGroupTouched(this.signInForm);
      console.log('Form is invalid');
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  // Navigate to create account page
  createAccount() {
    this.router.navigate(['/register']);
  }
}
