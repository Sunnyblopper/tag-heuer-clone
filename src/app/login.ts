import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Login {
  private url = 'http://127.0.0.1:3000/api/';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.url}users/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.url}users`, data);
  }
  
}
