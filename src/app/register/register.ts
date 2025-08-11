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
  showLoginPassword = false; // Fixed: separate variable for login password visibility
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
          this.loginErrorMessage = null;

          // Store token if available
          if (response?.data?.token) {
            localStorage.setItem('token', response.data.token);
          }

          // Enhanced user data creation with better email handling
          const userData = {
            // Spread any existing user data from response
            ...(response?.data?.user || response?.data || {}),
            
            // Always ensure email is set (priority order)
            email: response?.data?.user?.email || 
                   response?.data?.user?.user_email ||
                   response?.data?.email ||
                   response?.email ||
                   data.email, // fallback to the email used for login
            
            // Set name with fallbacks
            name: response?.data?.user?.name ||
                  response?.data?.user?.first_name ||
                  response?.data?.user?.firstName ||
                  response?.data?.name ||
                  data.email.split('@')[0] ||
                  'User',
            
            // Include other common properties that might be useful
            id: response?.data?.user?.id || response?.data?.id,
            first_name: response?.data?.user?.first_name || response?.data?.first_name,
            last_name: response?.data?.user?.last_name || response?.data?.last_name,
            
            // Store the original login email as backup
            loginEmail: data.email
          };

          console.log('Storing user data:', userData);
          localStorage.setItem('loginedUser', JSON.stringify(userData));

          // Navigate to user page
          this.router.navigate(['/user']).then(() => {
            // Optional: reload to ensure all components refresh with new data
            window.location.reload();
          });
        },
        (error) => {
          console.error('Login failed:', error);
          this.loginErrorMessage = error?.error?.message || 'Invalid email or password';
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
