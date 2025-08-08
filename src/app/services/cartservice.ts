import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cartservice {
  private baseUrl = 'http://127.0.0.1:3000/api/cart';  // ✅ Correct base URL

  constructor(private http: HttpClient) {}

  private getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  private createHeaders(): HttpHeaders {
    const authToken = this.getAuthToken();
    return new HttpHeaders().set('Authorization', 'Bearer ' + authToken);
  }

  // ✅ Get current user's cart items
  getCart(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.baseUrl}/user`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching cart:', error);
        return throwError(error);
      })
    );
  }

  // ✅ Add a product to the cart
  addToCart(data: any): Observable<any> {
    const headers = this.createHeaders();
    console.log('Adding product to cart:', data);
    return this.http.post(`${this.baseUrl}/user/product`, data, { headers }).pipe(
      catchError(error => {
        console.error('Error adding product to cart:', error);
        return throwError(error);
      })
    );
  }

  // ✅ Remove a specific product from the cart
  removeFromCart(data: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${this.baseUrl}/user/product/remove`, data, { headers }).pipe(
      catchError(error => {
        console.error('Error removing product from cart:', error);
        return throwError(error);
      })
    );
  }

  // ✅ Remove a product by its ID from the cart
  removeProduct(data: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.delete(`${this.baseUrl}/user/product`, { body: data, headers }).pipe(
      catchError(error => {
        console.error('Error removing product by ID:', error);
        return throwError(error);
      })
    );
  }

  // ✅ Update quantity of a product in the cart
  updateCart(data: { productId: string; quantity: number }): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put(`${this.baseUrl}/user/product/update`, data, { headers }).pipe(
      catchError(error => {
        console.error('Error updating cart:', error);
        return throwError(error);
      })
    );
  }
}
