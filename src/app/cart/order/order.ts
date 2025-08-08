import { Component } from '@angular/core';
import { Orderservice } from '../../services/orderservice';
import { Adressservice } from '../../services/adressservice';
import { CommonModule } from '@angular/common';
import { Cartservice } from '../../services/cartservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  imports: [CommonModule],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Order {
  orders: any[] = [];
  loading = true;
  error = '';
  address: any[] = [];

  currentStep = 'payment';

  cartData: any[] = [];
  cartSubtotal: number = 0;
  cartTotal: number = 0;

  savedAddresses: any[] = [];
  selectedAddressId: string | null = null;

  constructor(
    private orderService: Orderservice,
    private addressService: Adressservice,
    private cartService: Cartservice,
    private router : Router,
  ) {}

  async ngOnInit() {
    this.loadCheckoutCart();

  // ✅ Continue your other initial data fetch
  this.loadAddresses();
  this.fetchOrders();
  this.fetchAddresses();
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

  loadCheckoutCart() {
    const savedCart = localStorage.getItem('checkoutCart');

  if (savedCart) {
    // ✅ Parse and assign to display variables
    const parsedCart = JSON.parse(savedCart);
    this.cartData = parsedCart.cartItems || [];
    this.cartSubtotal = parsedCart.subtotal || 0;
    this.cartTotal = parsedCart.total || 0;
  } else {
    // ✅ Fallback: if no saved cart, fetch from backend
    this.getCartData();
    }
  }

  /**
   * ✅ Backend se current cart fetch karo
   */
  async getCartData() {
    return new Promise<void>((resolve, reject) => {
      this.cartService.getCart().subscribe({
        next: (data: any) => {
          this.cartData = data.data.products || [];
          this.cartSubtotal = this.cartData.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
          );
          this.cartTotal = this.cartSubtotal;
          console.log('✅ Loaded cart from backend:', this.cartData);
          resolve();
        },
        error: (err) => {
          console.error('❌ Error fetching cart data:', err);
          reject(err);
        }
      });
    });
  }

  loadAddresses() {
    this.addressService.getAddresses().subscribe({
      next: (res: any) => {
        this.savedAddresses = res.data || [];
        if (this.savedAddresses.length > 0) {
          this.selectedAddressId = this.savedAddresses[0]._id;
        }
      },
      error: (err) => {
        console.error('❌ Error loading addresses:', err);
      }
    });
  }

  selectAddress(id: string) {
    this.selectedAddressId = id;
  }

  async fetchOrders() {
    return new Promise<void>((resolve, reject) => {
      this.loading = true;
      this.orderService.getOrders().subscribe({
        next: (data) => {
          this.orders = data.data || [];
          this.loading = false;
          resolve();
        },
        error: (err) => {
          this.error = 'Failed to load orders';
          this.loading = false;
          reject(err);
        },
      });
    });
  }

  async fetchAddresses() {
    if (!this.orders || this.orders.length === 0) return;
    const addressPromises = this.orders.map(order => this.getAddress(order.address));
    await Promise.all(addressPromises);
  }

  async getAddress(id: string) {
    return new Promise<void>((resolve, reject) => {
      this.addressService.getAddress(id).subscribe({
        next: (data: any) => {
          const address = data?.data || {};
          this.address.push(address);
          resolve();
        },
        error: (err) => {
          console.error('❌ Error fetching address:', err);
          reject(err);
        },
        complete: () => {
          resolve();
        }
      });
    });
  }

  /**
   * ✅ Order ko "Paid" status par update karo
   */
  payOrder(orderId: string) {
    this.orderService.updateOrderStatus(orderId, { status: 'Paid' }).subscribe({
      next: () => {
        alert('✅ Payment successful!');
        this.fetchOrders();
      },
      error: (err: any) => {
        console.error('❌ Error updating order to Paid:', err);
        alert('Payment failed.');
      }
    });
  }

  /**
   * ✅ Order ko "Confirmed" status par update karo aur checkoutCart ko clear karo
   */
  confirmOrder(orderId: string) {
    this.orderService.updateOrderStatus(orderId, { status: 'Confirmed' }).subscribe({
    next: () => {
      alert('Order confirmed!');
      localStorage.removeItem('checkoutCart'); // ✅ Clear snapshot
      this.fetchOrders();
    },
    error: (err: any) => {
      console.error('Error confirming order:', err);
      alert('Confirmation failed.');
    }
  });
  }
}
