import { Component, OnInit } from '@angular/core';
import { Cartservice } from '../services/cartservice';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Watch } from './watch/watch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, Watch, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
   dataArray: any[] = [];
  cartItems: any[] = [];
  subtotal: number = 0;
  shipping: string = 'Free';
  taxes: string = 'Free';
  total: number = 0;
  loading: boolean = true;

  currentStep = 'cart';

  constructor(private cartService: Cartservice, private router: Router) {}

  async ngOnInit() {
    await this.refreshCartData();
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

  async refreshCartData() {
    // ✅ Reset all data before new fetch
    this.dataArray = [];
    this.cartItems = [];
    this.subtotal = 0;
    this.total = 0;
    this.loading = true;

    await this.getData();
    this.loading = false;
    this.calculations();
  }

  calculations() {
    // ✅ Prevent duplication
    this.cartItems = [];
    this.subtotal = 0;
    this.total = 0;

    for (let i = 0; i < this.dataArray.length; i++) {
      this.subtotal += this.dataArray[i].product.price * this.dataArray[i].quantity;
    }
    this.total = this.subtotal;

    for (let i = 0; i < this.dataArray.length; i++) {
      this.cartItems.push({
        watchId: this.dataArray[i].product._id,
        watchQuantity: this.dataArray[i].quantity,
        imageUrl: this.dataArray[i].product.images[3],
        watchName: this.dataArray[i].product.name,
        watchModel: this.dataArray[i].product.reference,
        price: this.dataArray[i].product.price,
        quantity: this.dataArray[i].quantity,
        movement: this.getmovement(this.dataArray[i].product.movement),
        caseSize: this.getCaseSize(this.dataArray[i].product.case),
        caseMaterial: this.getCaseMaterial(this.dataArray[i].product.case),
        dialColor: this.getDialColor(this.dataArray[i].product.dial)
      });
    }
  }

  async getData() {
    return new Promise<void>((resolve) => {
      this.cartService.getCart().subscribe((data: any) => {
        this.dataArray = data.data.products;
        resolve();
      }, (error) => {
        if (error.error === 'Please authenticate' || error.error === 'Unauthorized') {
          localStorage.removeItem('token');
        }
      });
    });
  }

  onCartUpdated() {
    this.refreshCartData();
  }

  getmovement(watch: any[]) {
    for (let i = 0; i < watch.length; i++) {
      if (watch[i].name === 'MOVEMENT') {
        return watch[i].description;
      }
    }
  }

  getCaseSize(watch: any[]) {
    for (let i = 0; i < watch.length; i++) {
      if (watch[i].name === 'SIZE') {
        return watch[i].description;
      }
    }
  }

  getCaseMaterial(watch: any[]) {
    for (let i = 0; i < watch.length; i++) {
      if (watch[i].name === 'CASE') {
        return watch[i].description;
      }
    }
  }

  getDialColor(watch: any[]) {
    for (let i = 0; i < watch.length; i++) {
      if (watch[i].name === 'COLOR') {
        return watch[i].description;
      }
    }
  }

  removeFromCart(item: any) {
    const data = {
      productId: item.watchId,
      quantity: item.watchQuantity
    };

    this.cartService.removeFromCart(data).subscribe(
      (response) => {
        console.log('Product removed from cart:', response);
        this.refreshCartData();
      },
      (error) => {
        console.error('Error removing product from cart:', error);
      }
    );
  }

  updateQuantity(item: any, newQuantity: number) {
    const data = {
      productId: item.watchId,
      quantity: newQuantity
    };

    this.cartService.updateCart(data).subscribe(
      (response) => {
        console.log('Product quantity updated:', response);
        this.refreshCartData();
      },
      (error) => {
        console.error('Error updating product quantity:', error);
      }
    );
  }

  proceedToCheckout() {
    // ✅ Save current cart snapshot without duplicates
    localStorage.setItem('checkoutCart', JSON.stringify({
      cartItems: this.cartItems,
      subtotal: this.subtotal,
      total: this.total
    }));

    this.router.navigate(['/checkout']);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
