import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../login';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  showLogin = false;

  // Registration form
  registerForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  // Login form
  loginForm!: FormGroup;
  showLoginPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private login: Login
  ) {}

  ngOnInit(): void {
    this.initRegisterForm();
    this.initLoginForm();
  }

  initRegisterForm(): void {
    this.registerForm = this.fb.group(
      {
        title: ['', Validators.required], // Make the title field required
        firstName: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        termsAccepted: [false, Validators.requiredTrue],
        newsletterOptIn: [false],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (!password || !confirmPassword) return null;

    return password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  toggleLoginPasswordVisibility(): void {
    this.showLoginPassword = !this.showLoginPassword;
  }

  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Registration form submitted:', this.registerForm.value);
      const user = {
        title: this.registerForm.value.title,
        first_name: this.registerForm.value.firstName,
        last_name: this.registerForm.value.surname,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        terms: this.registerForm.value.termsAccepted,
        news: this.registerForm.value.newsletterOptIn,
      };
      this.login.register(user).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          this.showLogin = true;
        },
        (error) => {
          console.error('Registration failed:', error);
        }
      );
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login form submitted:', this.loginForm.value);
      const data = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.login.login(data).subscribe(
        (response: any) => {
          console.log('Login successful:', response);
          localStorage.setItem('token', response?.data.token);
          localStorage.setItem(
            'loginedUser',
            JSON.stringify(response?.data.user)
          );
          this.router.navigate(['/user']);
        },
        (error) => {
          console.error('Login failed:', error.error);
        }
      );
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
