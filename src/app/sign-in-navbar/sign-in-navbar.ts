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
        // Store token if available
        if (response?.data?.token || response?.token) {
          localStorage.setItem('token', response.data?.token || response.token);
        }

        // Create a full, consistent userData object like in register page
        const userData = {
          id: response?.data?.user?.id || response?.data?.id || response?.id,
          email: response?.data?.user?.email || response?.data?.email || email,
          name: response?.data?.user?.name ||
                response?.data?.name ||
                response?.name,
          first_name: response?.data?.user?.first_name ||
                      response?.data?.first_name,
          last_name: response?.data?.user?.last_name ||
                     response?.data?.last_name,
          title: response?.data?.user?.title || response?.data?.title,
          username: response?.data?.user?.username || response?.data?.username,
          loginEmail: email,
          ...(response?.data?.user || {}),
          ...(response?.data || {}),
          loginTimestamp: new Date().toISOString()
        };

        // Save to localStorage
        localStorage.setItem('loginedUser', JSON.stringify(userData));

        // Dispatch event so navbar updates instantly
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'loginedUser',
          newValue: JSON.stringify(userData),
          oldValue: null,
          storageArea: localStorage
        }));

        this.loginSuccess.emit(userData);

        // Navigate and reload to reflect changes
        this.router.navigate(['/user']).then(() => {
          setTimeout(() => window.location.reload(), 100);
        });
      },
      (error: any) => {
        console.error('Login failed:', error);
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
