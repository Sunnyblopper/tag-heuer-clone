import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isMenuOpen = false;

  expandedMenu: { [key: string]: boolean } = {};

  menuItems = [
    { title: 'TIMEPIECES', subItems: ['Luxury Watches', 'Sport Watches', 'Classic Collection', 'Limited Editions'] },
    { title: 'CONNECTED WATCHES', subItems: ['Smart Features', 'Fitness Tracking', 'Connectivity'] },
    { title: 'EYEWEAR', subItems: ['Sunglasses', 'Prescription Glasses', 'Sports Eyewear'] },
    { title: 'BE INSPIRED', subItems: ['Stories', 'Heritage', 'Innovation'] },
    { title: 'TAG HEUER WORLD', subItems: ['About Us', 'News', 'Events', 'Partnerships'] },
    { title: 'SERVICES', subItems: ['Warranty', 'Repair Services', 'Customer Support', 'Care Instructions'] }
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Menu toggled:', this.isMenuOpen);
  }

  toggleSubmenu(title: string): void {
    this.expandedMenu[title] = !this.expandedMenu[title];
  }

  requestAppointment() {
  console.log('Request appointment clicked');
  alert('Appointment request would open here');
}

findStore() {
  console.log('Find store clicked');
  alert('Store finder would open here');
}

contactUs() {
  console.log('Contact us clicked');
  alert('Contact page would open here');
}

accessibility() {
  console.log('Accessibility clicked');
  alert('Accessibility options would open here');
}

changeLanguage() {
  console.log('Language change clicked');
  alert('Language selector would open here');
}

}
