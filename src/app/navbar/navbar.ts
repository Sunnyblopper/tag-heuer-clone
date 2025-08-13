import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SignInNavbar } from '../sign-in-navbar/sign-in-navbar';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, SignInNavbar],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isMenuOpen = false;
  selectedMenuItem = '';
  selectedSubSubItems: string[] = [];
  showLoginPopup = false;
  isMouseOverPopup = false;
  showUserPopup = false;
  loggedInUser: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();

    // Listen for storage changes (useful when login happens in different tabs)
    window.addEventListener('storage', (e) => {
      if (e.key === 'loginedUser' || e.key === 'token') {
        this.checkLoginStatus();
      }
    });

    // Listen for navigation events to refresh login status
    this.router.events.subscribe(() => {
      this.checkLoginStatus();
    });
  }

  // Enhanced method to check login status from localStorage
  checkLoginStatus(): void {
    const storedUser = localStorage.getItem('loginedUser');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      try {
        this.loggedInUser = JSON.parse(storedUser);
        console.log('User logged in:', this.loggedInUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        // Clear invalid data
        localStorage.removeItem('loginedUser');
        localStorage.removeItem('token');
        this.loggedInUser = null;
      }
    } else {
      this.loggedInUser = null;
    }
  }

  menuItems = [
    {
      title: 'TIMEPIECES',
      subItems: [
        { name: 'All Timepieces' },
        { name: 'Collections', children: ['Carrera', 'Aquaracer'] },
        { name: 'Accessories' },
        { name: 'Personalization', children: ['Engraving', 'Strap Options'] },
      ],
    },
    {
      title: 'CONNECTED WATCHES',
      subItems: [
        { name: 'All Connected Watches' },
        { name: 'Collections', children: ['Golf Edition', 'Wellness Edition'] },
        { name: 'All Accessories' },
        { name: 'Customize', children: ['Colors', 'Bands'] },
      ],
    },
    {
      title: 'EYEWEAR',
      subItems: [
        { name: 'All sunglasses' },
        { name: 'Collections' },
        { name: 'Discover TAG Heuer Eyewear' },
        {
          name: 'Advanced by Design',
          children: ['Carbon Frames', 'Performance Fit'],
        },
      ],
    },
    {
      title: 'BE INSPIRED',
      subItems: [
        { name: 'Essentials' },
        { name: 'Special editions' },
        { name: 'Automatic Watches' },
        { name: 'Chronograph watches' },
        { name: 'Tourbillon watches' },
        { name: 'Sport watches' },
        { name: 'Dive watches' },
        { name: 'Classic Watches' },
      ],
    },
    {
      title: 'TAG HEUER WORLD',
      subItems: [
        {
          name: 'TAG Heuer Maison',
          children: ['History', 'Craftsmanship', 'Heritage'],
        },
        { name: 'Formula 1®', children: ['History', 'Cars', 'Events'] },
        {
          name: 'TAG Heuer Partnerships',
          children: ['Sports Teams', 'Events', 'Celebrities'],
        },
        { name: 'Podcast' },
        { name: 'The EDGE Magazine' },
        { name: 'Careers' },
      ],
    },
    {
      title: 'SERVICES',
      subItems: [
        { name: 'Repair my watch' },
        { name: 'Services & Prices' },
        { name: 'Warranty' },
        { name: 'Care Recommendations' },
      ],
    },
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.selectedMenuItem = '';
      this.selectedSubSubItems = [];
    }
  }

  onMenuItemClick(title: string): void {
    this.selectedMenuItem = title;
    this.selectedSubSubItems = [];
  }

  get selectedSubItems(): { name: string; children?: string[] }[] {
    const item = this.menuItems.find((m) => m.title === this.selectedMenuItem);
    return item ? item.subItems : [];
  }

  onSubMenuItemClick(subItem: { name: string; children?: string[] }): void {
    this.selectedSubSubItems = subItem.children || [];
  }

  onSearchClick(): void {
    this.router.navigate(['/search']);
  }

  formula(): void {
    this.router.navigate(['/formula']);
  }

  onregister(): void {
    this.router.navigate(['/register']);
  }

  goToOrders() {
    this.router.navigate(['/user']);
  }

  requestAppointment() {
    console.log('Request an appointment clicked');
  }

  findStore() {
    this.router.navigate(['/map']);
  }

  contactUs() {
    this.router.navigate(['/contact']);
  }

  accessibility() {
    console.log('Accessibility clicked');
  }

  changeLanguage() {
    console.log('Change language clicked');
  }

  onPopupMouseEnter() {
    this.isMouseOverPopup = true;
    this.showUserPopup = true;
  }

  onPopupMouseLeave() {
    this.isMouseOverPopup = false;
    setTimeout(() => {
      if (!this.isMouseOverPopup) {
        this.showLoginPopup = false;
      }
    }, 4000);
  }

  goToAccount(accountId: number): void {
    localStorage.removeItem('userPage');
    localStorage.removeItem('orders');
    localStorage.removeItem('account');

    // Set based on passed ID
    if (accountId === 1) {
      localStorage.setItem('userPage', '1');
    } else if (accountId === 2) {
      localStorage.setItem('account', '1'); 
    } else if (accountId === 3) {
      localStorage.setItem('orders', '1');
    } else if (accountId === 4) {
      localStorage.setItem('account', '1');
    }

    this.router.navigate(['/user']);
  }

  onPopupClick(event: MouseEvent) {
    event.stopPropagation();
  }

  // Handle successful login from navbar login form
  handleLoginSuccess(user: any) {
    this.loggedInUser = user;
    this.showLoginPopup = false;
    console.log('Login successful in navbar:', user);
    // Force a check of login status to ensure UI updates
    this.checkLoginStatus();
  }

  onUserPopupMouseEnter() {
    this.isMouseOverPopup = true;
    this.showUserPopup = true;
  }

  onUserPopupMouseLeave() {
    this.isMouseOverPopup = false;
    setTimeout(() => {
      if (!this.isMouseOverPopup) {
        this.showUserPopup = false;
      }
    }, 300); // 300ms delay
  }

  // Sign out functionality
  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('loginedUser');
    this.loggedInUser = null;
    this.showUserPopup = false;

    this.router.navigate(['/']);
    console.log('User signed out successfully');
  }

  // Enhanced method to get user display name with better fallbacks
  getUserDisplayName(): string {
    if (this.loggedInUser) {
      // Try various possible name fields in order of preference
      const possibleNames = [
        this.loggedInUser.name,
        this.loggedInUser.first_name,
        this.loggedInUser.firstName,
        this.loggedInUser.user_name,
        this.loggedInUser.username,
        // If we have both first and last name, combine them
        this.loggedInUser.first_name && this.loggedInUser.last_name
          ? `${this.loggedInUser.first_name} ${this.loggedInUser.last_name}`
          : null,
        this.loggedInUser.firstName && this.loggedInUser.lastName
          ? `${this.loggedInUser.firstName} ${this.loggedInUser.lastName}`
          : null,
        // Fallback to email username part
        this.loggedInUser.email?.split('@')[0],
        this.loggedInUser.loginEmail?.split('@')[0],
      ];

      // Return the first non-empty, non-null value
      for (const name of possibleNames) {
        if (name && name.trim()) {
          return name.trim();
        }
      }
    }
    return 'User';
  }

  // Method to get user's full name for more formal displays
  getUserFullName(): string {
    if (this.loggedInUser) {
      const firstName =
        this.loggedInUser.first_name || this.loggedInUser.firstName || '';
      const lastName =
        this.loggedInUser.last_name || this.loggedInUser.lastName || '';

      if (firstName && lastName) {
        return `${firstName} ${lastName}`.trim();
      } else if (firstName) {
        return firstName;
      } else if (lastName) {
        return lastName;
      }
    }
    return this.getUserDisplayName();
  }
}
