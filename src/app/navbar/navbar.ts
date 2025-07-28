import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isMenuOpen: boolean = false;
  selectedMenuItem: string = '';
  selectedSubSubItems: string[] = [];

  constructor(private router: Router) {}

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
      this.selectedMenuItem = ''; // Clear the selected item
      this.selectedSubSubItems = []; // Clear the selected sub-sub items
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
    if (subItem.children) {
      this.selectedSubSubItems = subItem.children;
    } else {
      this.selectedSubSubItems = [];
    }
  }

  onSearchClick(): void {
    this.router.navigate(['/search']);
  }

  onregister(): void {
    this.router.navigate(['/register']);
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
}
