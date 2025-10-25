import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthRequest } from '../models/auth-request';
import { AuthResponse } from '../models/auth-response';
import jwt_decode from 'jwt-decode';

import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ApiResponse } from '../models/api-response';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private tokenKey = 'jwtToken';
  private currentToken: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  login(payload: AuthRequest) {
    return this.http.post<ApiResponse<AuthResponse>>(`${environment.apiBaseUrl}/v1/authenticate`, payload)
      .pipe(
        tap((response: ApiResponse<AuthResponse>) => {
          const token = response.data?.token;
          if (token) {
            this.setToken(token);
          }
        })
      );
  }

  logout() {
    this.currentToken = null;
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  setToken(token: string) {
    this.currentToken = token;
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return this.currentToken || localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const decoded: any = jwt_decode(token); // ✅ Funciona con JWTs estándar
      const exp = decoded?.exp;
      if (!exp) return false;
      const now = Math.floor(Date.now() / 1000);
      return exp > now;
    } catch (error) {
      console.error('Error decodificando token:', error);
      return false;
    }
  }
}
