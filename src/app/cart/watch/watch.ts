import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cartservice } from '../../services/cartservice';

@Component({
  selector: 'app-watch',
  imports: [],
  templateUrl: './watch.html',
  styleUrl: './watch.css'
})
export class Watch {

  @Input() watchId: string = '';
  @Input() imageUrl: string = '';
  @Input() watchName: string = '';
  @Input() watchModel: string = '';
  @Input() price: number = 0;
  @Input() movement: string = '';
  @Input() caseSize: string = '';
  @Input() caseMaterial: string = '';
  @Input() dialColor: string = '';
  @Input() quantity: number = 0; // max quantity allowed
  @Input() watchQuantity: number = 1; // current quantity in cart

  @Output() cartUpdated = new EventEmitter<void>();

  constructor(private cartService: Cartservice) {}

  incrementQuantity(event?: Event): void {
    if (event) event.preventDefault();

    if (this.watchQuantity < this.quantity) {
      const newQuantity = this.watchQuantity + 1;

      this.cartService.updateCart({
        productId: this.watchId,
        quantity: newQuantity
      }).subscribe({
        next: () => {
          this.watchQuantity = newQuantity;
          this.cartUpdated.emit();
        },
        error: (err) => {
          console.error('Error updating cart:', err);
        }
      });
    }
  }

  decrementQuantity(event?: Event): void {
    if (event) event.preventDefault();

    if (this.watchQuantity > 1) {
      const newQuantity = this.watchQuantity - 1;

      this.cartService.updateCart({
        productId: this.watchId,
        quantity: newQuantity
      }).subscribe({
        next: () => {
          this.watchQuantity = newQuantity;
          this.cartUpdated.emit();
        },
        error: (err) => {
          console.error('Error updating cart:', err);
        }
      });
    }
  }

  removeproduct(event?: Event): void {
    if (event) event.preventDefault();

    this.cartService.removeProduct({
      productId: this.watchId
    }).subscribe({
      next: () => {
        this.cartUpdated.emit();
      },
      error: (err) => {
        console.error('Error removing from cart:', err);
      }
    });
  }

}
