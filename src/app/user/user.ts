import { Component, OnInit } from '@angular/core';
import { Userdata } from './userdata/userdata';
import { Userorder } from './userorder/userorder';
import { Useraccount } from './useraccount/useraccount';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [CommonModule, Userdata, Userorder, Useraccount],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit {
  user = '';
  activeOption = 'my-tag-heuer';

  constructor(private router: Router) {
    const userData = JSON.parse(localStorage.getItem('loginedUser') || '{}');
    this.user = userData?.first_name || '';
    console.log(this.user);
  }

  ngOnInit() {
    const userPage = localStorage.getItem('userPage');
    const orders = localStorage.getItem('orders');
    const account = localStorage.getItem('account');

    if (userPage === '1') {
      this.activeOption = 'my-tag-heuer';
    } else if (orders === '1') {
      this.activeOption = 'my-orders';
    } else if (account === '1') {
      this.activeOption = 'my-account';
    }

    // Clear after use
    localStorage.removeItem('userPage');
    localStorage.removeItem('orders');
    localStorage.removeItem('account');
  }
  setActive(option: string) {
    this.activeOption = option;
  }

  signOut() {
    localStorage.removeItem('loginedUser');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
