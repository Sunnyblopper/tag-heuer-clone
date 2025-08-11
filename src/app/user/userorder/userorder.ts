import { Component } from '@angular/core';
import { Orderservice } from '../../services/orderservice';
import { Adressservice } from '../../services/adressservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userorder',
  imports: [CommonModule],
  templateUrl: './userorder.html',
  styleUrl: './userorder.css'
})
export class Userorder {
  orders: any[] = [];
  loading = true;
  error = '';
  address: any[] = [];

  constructor(
    private orderService: Orderservice,
    private addressService: Adressservice
  ) {}

  async ngOnInit() {
    await this.fetchOrders();
    await this.fetchAddresses();
  }

  async fetchOrders() {
    return new Promise<void>((resolve, reject) => {
      this.loading = true;
      this.orderService.getOrders().subscribe({
        next: (data) => {
          console.log('Orders:', data);
          this.orders = data.data;
          this.loading = false;
          resolve();
        },
        error: (err) => {
          this.error = 'Failed to load orders';
          this.loading = false;
          console.error(err);
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
          console.error('Error fetching address:', err);
          reject(err);
        },
        complete: () => {
          resolve();
        }
      });
    });
  }

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
