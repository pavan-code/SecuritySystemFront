import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };
  baseURL: String = "https://8080-cdfbbaabecfdfadcdafcbbdbadcaafbdcb.examlyiopb.examly.io";
  isLoggedIn() {
    const token = localStorage.getItem('token')
    if(token)
      return true;
    else
      return false;
  }
  login(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, data, this.httpOptions)
  }
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/register`, data, this.httpOptions)
  }
}
