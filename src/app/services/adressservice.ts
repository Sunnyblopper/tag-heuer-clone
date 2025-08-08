import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Adressservice {

  token = localStorage.getItem('token');
  url = 'http://127.0.0.1:3000/api/address';

  header = new HttpHeaders({
    'Authorization': `${this.token}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  addAddress(data: any) {
    return this.http.post(`${this.url}`, data, { headers: this.header });
  }

  updateAddress(id: string, data: any) {
    return this.http.put(`${this.url}/${id}`, data, { headers: this.header });
  }

  getAddress(id: any) {
    return this.http.get(`${this.url}/${id}`, { headers: this.header });
  }

  getAddresses() {
    return this.http.get(`${this.url}/user`, { headers: this.header });
  }

  deleteAddress(id: string) {
    return this.http.delete(`${this.url}/${id}`, { headers: this.header });
  }
}
