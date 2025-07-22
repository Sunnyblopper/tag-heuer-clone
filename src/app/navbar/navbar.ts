import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isMenuOpen: boolean = false;
  selectedMenuItem: string = '';

  menuItems = [
    { title: 'TIMEPIECES', subItems: ['All Timepieces' , 'Collections', 'Accessories', 'Personalization'] },
    { title: 'CONNECTED WATCHES', subItems: ['All Connected Watches', 'Collections', 'All Accessories', 'All About your connected watch', 'Customize your TAG Heuer Connected Watch'] },
    { title: 'EYEWEAR', subItems: ['All sunglasses', 'Collections', 'Discover TAG Heuer Eyewear', 'Advanced by Design, Defined by Materials'] },
    { title: 'BE INSPIRED', subItems: ['Essentials', 'Special editions', 'Automatic Watches', 'Chronograph watches', 'Tourbillon watches', 'Sport watches', 'Dive watches', 'Classic Watches'] },
    { title: 'TAG HEUER WORLD', subItems: ['TAG Heuer Maison', 'Formula 1®', 'TAG Heuer Partnerships', 'TAG Heuer Ambassadors', 'Podcast', 'The EDGE Magazine', 'Careers'] },
    { title: 'SERVICES', subItems: ['Repair my watch', 'Services & Prices', 'Warranty', 'Care Recommendations'] }
  ];

  

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onMenuItemClick(title: string): void {
    this.selectedMenuItem = title;
  }

  get selectedSubItems(): string[] {
    const item = this.menuItems.find(m => m.title === this.selectedMenuItem);
    return item ? item.subItems : [];
  }

  requestAppointment() {
    console.log('Request an appointment clicked');
  }

  findStore() {
    console.log('Find a store clicked');
  }

  contactUs() {
    console.log('Contact us clicked');
  }

  accessibility() {
    console.log('Accessibility clicked');
  }

  changeLanguage() {
    console.log('Change language clicked');
  }
}
