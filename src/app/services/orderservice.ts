import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Orderservice {
  token = localStorage.getItem('token');

  url = 'http://127.0.0.1:3000/api/orders/';
  header = new HttpHeaders({
    'Authorization': `${this.token}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  placeOrder(data: any) {
    return this.http.post(`${this.url}`, data, { headers: this.header });
  }
  
  getOrders(): Observable<any> {
    return this.http.get(this.url + "user", { headers: this.header });
  }

  // 🔹 New method for updating order status
  updateOrderStatus(orderId: string, body: any): Observable<any> {
    return this.http.put(`${this.url}${orderId}`, body, { headers: this.header });
  }
}
