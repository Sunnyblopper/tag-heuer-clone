import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Adressservice } from '../../services/adressservice';
import { CommonModule } from '@angular/common';
import { Checkout } from '../../cart/checkout/checkout';

@Component({
  selector: 'app-useraccount',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Checkout],
  templateUrl: './useraccount.html',
  styleUrl: './useraccount.css'
})
export class Useraccount{
  savedAddresses: any[] = [];
  addressesRegistered = false;
  openAddress = false;
  editMode = false;

  userForm!: FormGroup;
  countries: string[] = [
    'United States', 'Pakistan', 'Canada', 'United Kingdom', 'France', 'Germany',
    'Italy', 'Spain', 'Australia', 'Japan', 'China', 'Brazil', 'India'
  ];

  user = {
    email: '',
    phone: '',
  };

  subscriptions = { news: true };

  constructor(private fb: FormBuilder, private address: Adressservice) {
    const localUser = JSON.parse(localStorage.getItem('loginedUser') || '{}');
    this.user = { ...this.user, ...localUser };
    this.address.getAddresses().subscribe((res: any) => {
      this.savedAddresses = res.data;
      this.addressesRegistered = this.savedAddresses && this.savedAddresses.length > 0;
    });
  }


  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  onSubmit() {
    if (this.userForm.valid) {
      const updatedUser = {
        ...this.user,
        first_name: this.userForm.value.firstName,
        last_name: this.userForm.value.lastName,
        dateOfBirth: this.userForm.value.dateOfBirth,
        phone: this.userForm.value.phoneNumber,
        country: this.userForm.value.country
      };
      localStorage.setItem('loginedUser', JSON.stringify(updatedUser));
      this.user = updatedUser;
      this.editMode = false;
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  addNewAddress() {
    this.openAddress = true;
  }

  closeAddress() {
    this.openAddress = false;
  }

  savePreferences() {
    let user = JSON.parse(localStorage.getItem('loginedUser') || '{}');
    user.news = this.subscriptions.news;
    localStorage.setItem('loginedUser', JSON.stringify(user));
  }
}
