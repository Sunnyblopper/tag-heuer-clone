import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in-navbar',
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-in-navbar.html',
  styleUrl: './sign-in-navbar.css'
})
export class SignInNavbar {
  showPassword: boolean = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    console.log('Form submitted');
  }

}
