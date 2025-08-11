import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdata',
  imports: [],
  templateUrl: './userdata.html',
  styleUrl: './userdata.css',
})
export class Userdata {
  email: string = '';
  userData: any = null;

  constructor(private router: Router) {
    this.loadUserData();
  }

  private loadUserData(): void {
    try {
      // Get user data from localStorage
      const storedUser = localStorage.getItem('loginedUser');
      
      console.log('Raw stored user data:', storedUser);
      
      if (storedUser) {
        this.userData = JSON.parse(storedUser);
        console.log('Parsed user data:', this.userData);

        // Handle different possible email property names from login response
        // Try multiple possible email field names
        this.email = 
          this.userData?.email ||
          this.userData?.user_email ||
          this.userData?.username ||
          this.userData?.loginEmail ||  // backup from login form
          this.userData?.user?.email ||
          this.userData?.user?.user_email ||
          '';

        console.log('Final extracted email:', this.email);

        if (!this.email) {
          console.warn('No email found in user data. Available properties:', Object.keys(this.userData));
          
          // Debug: log all properties to see what's available
          console.log('All user data properties:');
          for (const [key, value] of Object.entries(this.userData)) {
            console.log(`  ${key}: ${value}`);
          }
        } else {
          console.log('Email successfully loaded:', this.email);
        }
      } else {
        // If no user data is found, redirect to login
        console.warn('No logged-in user found, redirecting to login...');
        this.router.navigate(['/register']);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      console.error('Raw localStorage data:', localStorage.getItem('loginedUser'));
      this.router.navigate(['/register']);
    }
  }

  contact(): void {
    this.router.navigate(['/contact']);
  }

  // Method to manually refresh user data (for debugging)
  refreshUserData(): void {
    this.loadUserData();
  }

  // Method to clear user data and logout
  logout(): void {
    localStorage.removeItem('loginedUser');
    localStorage.removeItem('token');
    this.router.navigate(['/register']);
  }
}
