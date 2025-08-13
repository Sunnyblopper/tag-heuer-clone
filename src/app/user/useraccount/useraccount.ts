import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Adressservice } from '../../services/adressservice';
import { CommonModule } from '@angular/common';
import { Checkout } from '../../cart/checkout/checkout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-useraccount',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Checkout],
  templateUrl: './useraccount.html',
  styleUrl: './useraccount.css',
})
export class Useraccount {
  savedAddresses: any[] = [];
  openAddress = false;
  addressesRegistered = false;
  editMode = false;

  userForm!: FormGroup;
  countries: string[] = [
    'United States',
    'Canada',
    'United Kingdom',
    'France',
    'Germany',
    'Italy',
    'Spain',
    'Australia',
    'Japan',
    'China',
    'Brazil',
    'India',
  ];

  user = {
    title: 'Mr.',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    country: '',
  };

  subscriptions = {
    newsMain: false,
    newsTag: false,
  };

  constructor(private address: Adressservice, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
    this.initForm();
    this.loadAddresses();
  }

  loadUserData(): void {
    const storedUser = localStorage.getItem('loginedUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      console.log('Loaded user data:', userData); // Debug log
      
      // Map the stored user data to your user object
      this.user = {
        title: userData.title || 'Mr.',
        first_name: userData.first_name || userData.firstName || '',
        last_name: userData.last_name || userData.lastName || '',
        email: userData.email || userData.loginEmail || '',
        phone: userData.phone || '',
        dateOfBirth: userData.dateOfBirth || '',
        country: userData.country || '',
      };

      // Load subscription preferences if they exist
      this.subscriptions = {
        newsMain: userData.newsMain || false,
        newsTag: userData.newsTag || false,
      };
    }
  }

  

  loadAddresses(): void {
    this.address.getAddresses().subscribe((res: any) => {
      this.savedAddresses = res.data;
      this.addressesRegistered = this.savedAddresses.length > 0;
    });
  }

  initForm(): void {
    this.userForm = this.fb.group({
      firstName: [this.user.first_name, Validators.required],
      lastName: [this.user.last_name, Validators.required],
      dateOfBirth: [this.user.dateOfBirth, Validators.required],
      phoneNumber: [
        this.user.phone,
        [Validators.required, Validators.pattern(/^\+?[0-9\s-()]{7,20}$/)],
      ],
      country: [this.user.country, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedData = this.userForm.value;
      
      // Update user object
      this.user.first_name = updatedData.firstName;
      this.user.last_name = updatedData.lastName;
      this.user.dateOfBirth = updatedData.dateOfBirth;
      this.user.phone = updatedData.phoneNumber;
      this.user.country = updatedData.country;

      // Get existing user data from localStorage
      const existingUserData = JSON.parse(localStorage.getItem('loginedUser') || '{}');
      
      // Update the stored user data
      const updatedUserData = {
        ...existingUserData,
        first_name: updatedData.firstName,
        firstName: updatedData.firstName, // Keep both formats for compatibility
        last_name: updatedData.lastName,
        lastName: updatedData.lastName, // Keep both formats for compatibility
        dateOfBirth: updatedData.dateOfBirth,
        phone: updatedData.phoneNumber,
        country: updatedData.country,
      };

      localStorage.setItem('loginedUser', JSON.stringify(updatedUserData));
      this.editMode = false;
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  editInformation() {
    this.editMode = true;
  }

  changePassword() {
    console.log('Change password clicked');
  }

  changeEmail() {
    console.log('Change email clicked');
  }

  deleteAccount() {
    console.log('Delete account clicked');
  }

  addNewAddress() {
    this.openAddress = true;
  }

  closeAddress() {
    this.openAddress = false;
  }

  manageCookies() {
    console.log('Manage cookies clicked');
  }

  savePreferences() {
    const existingUserData = JSON.parse(localStorage.getItem('loginedUser') || '{}');
    const updatedUserData = {
      ...existingUserData,
      newsMain: this.subscriptions.newsMain,
      newsTag: this.subscriptions.newsTag,
    };
    localStorage.setItem('loginedUser', JSON.stringify(updatedUserData));
  }
}
