import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };
  baseURL: String =
    'https://8080-cdfbbaabecfdfadcdafcbbdbadcaafbdcb.examlyiopb.examly.io';
  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) return true;
    else return false;
  }
  login(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, data, this.httpOptions);
  }
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/register`, data, this.httpOptions);
  }

  didSetBankPassword(email: string) {
    return this.http.get(`${this.baseURL}/isBankLocked?email=${email}`, this.httpOptions)
  }
  setBankPassword(data: any) {
    return this.http.post(`${this.baseURL}/setBankPassword`, data, this.httpOptions)
  }
  checkBankPassword(data: any) {
    return this.http.post(`${this.baseURL}/checkBankPassword`, data, this.httpOptions)
  }
  
  didSetMediaPassword(email: string) {
    return this.http.get(`${this.baseURL}/isMediaLocked?email=${email}`, this.httpOptions)
  }
  setMediaPassword(data: any) {
    return this.http.post(`${this.baseURL}/setMediaPassword`, data, this.httpOptions)
  }
  checkMediaPassword(data: any) {
    return this.http.post(`${this.baseURL}/checkMediaPassword`, data, this.httpOptions)
  }
  getBankAccounts(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/getBankAccounts?email=${email}`, this.httpOptions);
  }
  addBankAccount(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/addBankAccount`, data, this.httpOptions)
  }
  deleteAccount(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/deleteAccount?id=${id}`, this.httpOptions);
  }
  updateAccount(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/updateAccount`, data, this.httpOptions)
  }
}
