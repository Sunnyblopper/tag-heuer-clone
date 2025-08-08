import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cartservice } from '../../services/cartservice';
import { Orderservice } from '../../services/orderservice';
import { Adressservice } from '../../services/adressservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  addressForm: FormGroup;
  showAddressModal = false;
  savedAddresses: any[] = [];
  selectedAddressId: string | null = null;
  dataArray: any[] = [];
  total_price: number = 0;

  editMode: boolean = false;
  editingAddressId: string | null = null;

  currentStep = 'shipping';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private address: Adressservice,
    private cart: Cartservice,
    private order: Orderservice
  ) {
    this.addressForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postal_code: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      region: ['', Validators.required],
      addressName: [''],
    });
  }

  ngOnInit() {
    this.loadAddresses();
  }

  goTo(step: string) {
    if (step === 'cart') {
      this.router.navigate(['/cart']);
    } else if (step === 'shipping') {
      this.router.navigate(['/checkout']);
    } else if (step === 'payment') {
      this.router.navigate(['/orders']);
    }
  }

  loadAddresses() {
    this.address.getAddresses().subscribe((res: any) => {
      this.savedAddresses = res.data;
      if (this.savedAddresses.length > 0) {
        this.selectedAddressId = this.savedAddresses[0]._id;
      }
    });
  }

  selectAddress(addressId: string) {
    this.selectedAddressId = addressId;
  }

  openAddressModal() {
    this.showAddressModal = true;
  }

  closeAddressModal() {
    this.showAddressModal = false;
  }

  editAddress(address: any) {
    this.editMode = true;
    this.editingAddressId = address._id;
    this.addressForm.patchValue(address);
    this.openAddressModal();
  }

  deleteAddress(id: string) {
    if (confirm('Are you sure you want to delete this address?')) {
      this.address.deleteAddress(id).subscribe(() => {
        this.savedAddresses = this.savedAddresses.filter(a => a._id !== id);
        if (this.selectedAddressId === id) {
          this.selectedAddressId = this.savedAddresses.length > 0 ? this.savedAddresses[0]._id : null;
        }
      });
    }
  }

  saveAddress() {
    if (this.addressForm.valid) {
      if (this.editMode && this.editingAddressId) {
        this.address.updateAddress(this.editingAddressId, this.addressForm.value)
          .subscribe((res: any) => {
            const index = this.savedAddresses.findIndex(a => a._id === this.editingAddressId);
            if (index !== -1) {
              this.savedAddresses[index] = res.data;
            }
            this.resetForm();
          });
      } else {
        this.address.addAddress(this.addressForm.value).subscribe((res: any) => {
          if (res.data && res.data._id) {
            this.savedAddresses.push(res.data);
            this.selectedAddressId = res.data._id;
          }
          this.resetForm();
        });
      }
    }
  }

  resetForm() {
    this.addressForm.reset();
    this.editMode = false;
    this.editingAddressId = null;
    this.closeAddressModal();
  }

  async confirmOrder() {
    if (!this.selectedAddressId) {
      alert('Please select a shipping address');
      return;
    }

    await this.getData();

    const data = {
      address: this.selectedAddressId,
      products: this.dataArray,
      total_price: this.total_price,
    };

    this.order.placeOrder(data).subscribe(
      (res: any) => {
        console.log('Order placed:', res);
        // Redirect to Orders page
        this.router.navigate(['/orders']);
      },
      (error) => {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again.');
      }
    );
  }

  async getData() {
    return new Promise<void>((resolve) => {
      this.cart.getCart().subscribe(
        (data: any) => {
          this.dataArray = data.data.products;
          this.total_price = data.data.total_price;
          resolve();
        },
        (error) => {
          if (error.error == 'Please authenticate' || error.error == 'Unauthorized') {
            localStorage.removeItem('token');
          }
        }
      );
    });
  }
}
