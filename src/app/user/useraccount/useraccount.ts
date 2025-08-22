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
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './useraccount.html',
  styleUrl: './useraccount.css',
})
export class Useraccount implements OnInit {
  savedAddresses: any[] = [];
  openAddress = false;
  addressesRegistered = false;
  editMode = false;

  addressForm!: FormGroup;
  userForm!: FormGroup;

  // New title dropdown list
  titles: string[] = ['Mr.', 'Mrs.', 'Miss.', 'Dr.'];
  numbers: string[] = ['+92', '+91', '+1', '+44'];

  // Country list for form
  countryNames: string[] = [
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
    title: 'Mr',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    country: '',
  };

  subscriptions = {
    newsMain: false,
    newsTag: false,
  };

  constructor(
    private address: Adressservice,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('loginedUser') || '{}');
    this.address.getAddresses().subscribe((res: any) => {
      this.savedAddresses = res.data;
      this.addressesRegistered = this.savedAddresses.length > 0;
    });
  }

  ngOnInit(): void {
    this.loadUserData();
    this.initForm();
    this.loadAddresses();
    this.initAddressForm();
  }

  initAddressForm(): void {
    this.addressForm = this.fb.group({
      addressName: [''],
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      region: ['', Validators.required],
      postal_code: ['', Validators.required],
      country: ['', Validators.required],
      phone: [0, [Validators.required]],
    });
  }

  saveAddress(): void {
    if (this.addressForm.valid) {
      const newAddress = this.addressForm.value;
      this.savedAddresses.push(newAddress);
      this.addressesRegistered = true;
      this.addressForm.reset();
      this.closeAddress();
    } else {
      this.addressForm.markAllAsTouched();
    }
  }

  loadUserData(): void {
    const storedUser = localStorage.getItem('loginedUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);

      this.user = {
        title: userData.title || 'Mr',
        firstName: userData.first_name || userData.firstName || '',
        lastName: userData.last_name || userData.lastName || '',
        email: userData.email || userData.loginEmail || '',
        phone: userData.phone || '',
        dateOfBirth: userData.dateOfBirth || '',
        country: userData.country || '',
      };

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
    // Parse existing phone number to extract country code and number
    let countryCode = '+92'; // default
    let phoneNumber = '';

    if (this.user.phone) {
      const phoneStr = this.user.phone.toString().trim();
      // Find matching country code
      const matchingCode = this.numbers.find((code) =>
        phoneStr.startsWith(code)
      );
      if (matchingCode) {
        countryCode = matchingCode;
        phoneNumber = phoneStr.substring(matchingCode.length).trim();
      } else {
        phoneNumber = phoneStr;
      }
    }

    this.userForm = this.fb.group({
      title: [this.user.title, Validators.required],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      number: [countryCode, Validators.required],
      phoneNumber: [
        phoneNumber,
        [Validators.required, Validators.pattern(/^\d{7,15}$/)],
      ],
      dateOfBirth: [this.user.dateOfBirth, Validators.required],
      country: [this.user.country, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedData = this.userForm.value;

      const fullPhoneNumber = `${updatedData.number} ${updatedData.phoneNumber}`;

      this.user = {
        ...this.user,
        title: updatedData.title,
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        dateOfBirth: updatedData.dateOfBirth,
        phone: fullPhoneNumber,
        country: updatedData.country,
      };

      const existingUserData = JSON.parse(
        localStorage.getItem('loginedUser') || '{}'
      );

      const updatedUserData = {
        ...existingUserData,
        title: updatedData.title,
        first_name: updatedData.firstName,
        firstName: updatedData.firstName,
        last_name: updatedData.lastName,
        lastName: updatedData.lastName,
        dateOfBirth: updatedData.dateOfBirth,
        phone: fullPhoneNumber,
        country: updatedData.country,
      };

      localStorage.setItem('loginedUser', JSON.stringify(updatedUserData));
      this.editMode = false;

      console.log('Data saved successfully:', updatedUserData);
      alert('Profile updated successfully!'); // Add this for confirmation
    } else {
      this.userForm.markAllAsTouched();
      console.log('Form is invalid. Please check all required fields.');
    }
  }

  // Helper method to debug form errors
  getFormErrors(): any {
    let formErrors: any = {};
    Object.keys(this.userForm.controls).forEach((key) => {
      const controlErrors = this.userForm.get(key)?.errors;
      if (controlErrors) {
        formErrors[key] = controlErrors;
      }
    });
    return formErrors;
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
    const existingUserData = JSON.parse(
      localStorage.getItem('loginedUser') || '{}'
    );
    const updatedUserData = {
      ...existingUserData,
      newsMain: this.subscriptions.newsMain,
      newsTag: this.subscriptions.newsTag,
    };
    localStorage.setItem('loginedUser', JSON.stringify(updatedUserData));
    console.log('Preferences saved successfully!');
  }
}
