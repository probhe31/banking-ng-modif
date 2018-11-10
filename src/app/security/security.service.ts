import { Injectable } from '@angular/core';
import { LoginResponse } from './app-user-auth';
import { AppUser } from './app-user';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { AppUserClaim } from './app-user-claim';

const API_URL = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  securityObject: LoginResponse = new LoginResponse();
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {
  }

  login(entity: AppUser): Observable<LoginResponse> {
    this.resetSecurityObject();
    return this.http.post<LoginResponse>(API_URL + '/v1/auth/login', entity, httpOptions).
      pipe(
        tap(resp => {
          localStorage.setItem('bearerToken', resp.token);
        })
      );
  }

  logout(): void {
    this.resetSecurityObject();
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('bearerToken');
    if (token == null) {
        return false;
    }
    return this.jwtHelper.isTokenExpired(token) === false;
  }

  getUserName(): string {
    const token = localStorage.getItem('bearerToken');
    if (token == null) {
        return '';
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.sub;
  }

  getTokenExpirationDate(): Date {
    const token = localStorage.getItem('bearerToken');
    if (token == null) {
        return null;
    }
    return this.jwtHelper.getTokenExpirationDate(token);
  }

  getClaims(): AppUserClaim[] {
    const claims: Array<AppUserClaim> = Array();
    const token = localStorage.getItem('bearerToken');
    if (token == null) {
        return [];
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    claims.push(new AppUserClaim('accessAccounts', decodedToken.accessAccounts));
    claims.push(new AppUserClaim('accessCustomers', decodedToken.accessCustomers));
    claims.push(new AppUserClaim('addAccount', decodedToken.addAccount));
    claims.push(new AppUserClaim('addCustomer', decodedToken.addCustomer));
    claims.push(new AppUserClaim('saveAccount', decodedToken.saveAccount));
    claims.push(new AppUserClaim('saveCustomer', decodedToken.saveCustomer));
    return claims;
  }

  resetSecurityObject(): void {
    localStorage.removeItem('bearerToken');
  }

  hasClaim(claimType: any, claimValue?: any) {
    let ret = false;
    if (typeof claimType === 'string') {
      ret = this.isClaimValid(claimType, claimValue);
    } else {
      const claims: string[] = claimType;
      if (claims) {
        for (let index = 0; index < claims.length; index++) {
          ret = this.isClaimValid(claims[index]);
          if (ret) {
            break;
          }
        }
      }
    }
    return ret;
  }

  private isClaimValid(claimType: string, claimValue?: string): boolean {
    let ret = false;
    if (claimType.indexOf(':') >= 0) {
      const words: string[] = claimType.split(':');
      claimType = words[0].toLowerCase();
      claimValue = words[1];
    } else {
      claimType = claimType.toLowerCase();
      claimValue = claimValue ? claimValue : 'true';
    }
    const claims = this.getClaims();
    ret = claims.find(c =>
      c.type.toLowerCase() === claimType &&
      c.value === claimValue) != null;
    return ret;
  }
}
