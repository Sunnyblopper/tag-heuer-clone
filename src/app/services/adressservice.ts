import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Adressservice {

  private url = 'http://127.0.0.1:3000/api/address';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Add Bearer if backend expects it
      'Content-Type': 'application/json'
    });
  }

  addAddress(data: any) {
    return this.http.post(`${this.url}`, data, { headers: this.getHeaders() });
  }

  updateAddress(id: string, data: any) {
    return this.http.put(`${this.url}/${id}`, data, { headers: this.getHeaders() });
  }

  getAddress(id: any) {
    return this.http.get(`${this.url}/${id}`, { headers: this.getHeaders() });
  }

  getAddresses() {
    return this.http.get(`${this.url}/user`, { headers: this.getHeaders() });
  }

  deleteAddress(id: string) {
    return this.http.delete(`${this.url}/${id}`, { headers: this.getHeaders() });
  }
}
