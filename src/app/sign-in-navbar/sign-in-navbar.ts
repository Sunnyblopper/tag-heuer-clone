import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';
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
  formVisible = false;

  @Output() loginSuccess = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private loginService: Login,
    private router: Router,
    private eRef: ElementRef
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  // Toggle password visibility
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleForm(event: MouseEvent): void {
    event.stopPropagation(); // Prevents it from immediately closing
    this.formVisible = !this.formVisible;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.formVisible = false;
    }
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;

      this.loginService.login({ email, password }).subscribe(
        (response: any) => {
          // Store token
          if (response?.data?.token) {
            localStorage.setItem('token', response.data.token);
          }

          // Create a normalized user object
          const userData = {
            ...response?.data?.user,
            name:
              response?.data?.user?.name ||
              response?.data?.user?.first_name ||
              response?.data?.user?.firstName ||
              response?.data?.user?.email?.split('@')[0] ||
              'User',
          };

          localStorage.setItem('loginedUser', JSON.stringify(userData));

          this.loginSuccess.emit(response.data.user);

          // Navigate and reload
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        },
        (error: any) => {
          console.error('Login failed:', error);
          // Optional: Add user-facing error messages here
        }
      );
    } else {
      this.markFormGroupTouched(this.signInForm);
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

  createAccount() {
    this.router.navigate(['/register']);
  }
}
