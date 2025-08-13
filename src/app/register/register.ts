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

  // ✅ Success & error messages
  successMessage: string | null = null;
  errorMessage: string | null = null;

  // Registration form
  registerForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  // Login form
  loginForm!: FormGroup;
  showLoginPassword = false;
  loginErrorMessage: string | null = null;

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
        title: ['', Validators.required],
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

  // Updated onRegisterSubmit method in register.component.ts
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

          // ✅ Store user data immediately after successful registration
          const userData = {
            id: response?.data?.id || response?.id,
            title: this.registerForm.value.title,
            first_name: this.registerForm.value.firstName,
            last_name: this.registerForm.value.surname,
            firstName: this.registerForm.value.firstName, // Keep both formats
            lastName: this.registerForm.value.surname, // Keep both formats
            email: this.registerForm.value.email,
            phone: '',
            dateOfBirth: '',
            country: '',
            newsMain: this.registerForm.value.newsletterOptIn,
            newsTag: false,
            registrationTimestamp: new Date().toISOString(),
            ...(response?.data || {}),
          };

          console.log('Storing registration user data:', userData);
          localStorage.setItem('loginedUser', JSON.stringify(userData));

          // ✅ Show success message
          this.successMessage = 'Account created successfully!';
          this.errorMessage = null;

          // ✅ Reset the form after successful registration
          this.registerForm.reset();
          this.registerForm.markAsPristine();
          this.registerForm.markAsUntouched();

          // ✅ Switch to login page after 3s
          setTimeout(() => {
            this.successMessage = null;
            this.showLogin = true;
          }, 3000);
        },
        (error) => {
          console.error('Registration failed:', error);
          this.errorMessage = error?.error?.message || 'Registration failed';
          this.successMessage = null;
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
          this.loginErrorMessage = null;

          // ✅ Show success message
          this.successMessage = 'Login successful!';
          this.errorMessage = null;

          // Store token if available
          if (response?.data?.token || response?.token) {
            localStorage.setItem(
              'token',
              response.data?.token || response.token
            );
          }

          const userData = {
            id: response?.data?.user?.id || response?.data?.id || response?.id,
            email:
              response?.data?.user?.email ||
              response?.data?.user?.user_email ||
              response?.data?.email ||
              response?.email ||
              data.email,
            name:
              response?.data?.user?.name ||
              response?.data?.name ||
              response?.name,
            first_name:
              response?.data?.user?.first_name ||
              response?.data?.user?.firstName ||
              response?.data?.first_name ||
              response?.data?.firstName ||
              response?.first_name ||
              response?.firstName,
            last_name:
              response?.data?.user?.last_name ||
              response?.data?.user?.lastName ||
              response?.data?.last_name ||
              response?.data?.lastName ||
              response?.last_name ||
              response?.lastName,
            firstName:
              response?.data?.user?.firstName ||
              response?.data?.user?.first_name ||
              response?.data?.firstName ||
              response?.data?.first_name ||
              response?.firstName ||
              response?.first_name,
            lastName:
              response?.data?.user?.lastName ||
              response?.data?.user?.last_name ||
              response?.data?.lastName ||
              response?.data?.last_name ||
              response?.lastName ||
              response?.last_name,
            title:
              response?.data?.user?.title ||
              response?.data?.title ||
              response?.title,
            username:
              response?.data?.user?.username ||
              response?.data?.username ||
              response?.username,
            user_name:
              response?.data?.user?.user_name ||
              response?.data?.user_name ||
              response?.user_name,
            loginEmail: data.email,
            ...(response?.data?.user || {}),
            ...(response?.data || {}),
            loginTimestamp: new Date().toISOString(),
          };

          console.log('Storing user data:', userData);
          localStorage.setItem('loginedUser', JSON.stringify(userData));

          window.dispatchEvent(
            new StorageEvent('storage', {
              key: 'loginedUser',
              newValue: JSON.stringify(userData),
              oldValue: null,
              storageArea: localStorage,
            })
          );

          // ✅ Delay navigation for 3s after login
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['/user']).then(() => {
              setTimeout(() => {
                window.location.reload();
              }, 100);
            });
          }, 3000);
        },
        (error) => {
          console.error('Login failed:', error);
          this.loginErrorMessage =
            error?.error?.message || 'Invalid email or password';

          this.errorMessage = this.loginErrorMessage;
          this.successMessage = null;
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
