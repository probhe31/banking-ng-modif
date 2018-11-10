import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Account } from './account';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl + '/v1/customers';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) { }

  getAccounts(customerId: number): Observable<Account[]> {
    return this.http.get<any>(API_URL + '/' + customerId + '/accounts').pipe(map(res => res));
  }

  getAccount(id: number): Observable<Account> {
    return this.http.get<Account>(API_URL + '/accounts/' + id.toString());
  }

  addAccount(customerId: number, entity: Account): Observable<Account> {
    return this.http.post<Account>(API_URL + '/' + customerId + '/accounts', entity, httpOptions);
  }

  updateAccount(id: number, entity: Account): Observable<any> {
    return this.http.put(API_URL + '/accounts/' + id.toString(), entity, httpOptions);
  }

  deleteAccount(id: number): Observable<Account> {
    return this.http.delete<Account>(API_URL + '/accounts/' + id.toString(), httpOptions);
  }
}
