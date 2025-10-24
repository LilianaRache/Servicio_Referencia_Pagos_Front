import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthRequest } from '../models/auth-request';
import { AuthResponse } from '../models/auth-response';
//import * as jwt_decode from 'jwt-decode';
const jwt_decode: any = require('jwt-decode');

import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  private tokenKey = 'rp_token';

  constructor(private http: HttpClient, private router: Router) {}

  login(payload: AuthRequest) {
  return this.http.post<AuthResponse>(`${environment.apiBaseUrl}/v1/authenticate`, payload)
    .pipe(
      tap((response: AuthResponse) => {
        this.setToken(response.token);
      })
    );
}

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const decoded: any = jwt_decode(token);
      //const decoded: any = jwt_decode.default(token);
      const exp = decoded?.exp;
      if (!exp) return false;
      const now = Math.floor(Date.now() / 1000);
      return exp > now;
    } catch (e) {
      return false;
    }
  }
}
