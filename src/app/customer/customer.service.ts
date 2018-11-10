import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Customer } from './customer';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl + '/v1/customers';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<any>(API_URL).pipe(map(res => res));
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(API_URL + '/' + id.toString());
  }

  addCustomer(entity: Customer): Observable<Customer> {
    return this.http.post<Customer>(API_URL, entity, httpOptions);
  }

  updateCustomer(entity: Customer): Observable<any> {
    return this.http.put(API_URL, entity, httpOptions);
  }

  deleteCustomer(id: number): Observable<Customer> {
    return this.http.delete<Customer>(API_URL + '/' + id.toString(), httpOptions);
  }
}
