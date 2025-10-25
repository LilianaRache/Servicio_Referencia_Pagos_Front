import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    const isAuth = this.auth.isAuthenticated();
    console.log('🧩 AuthGuard => isAuthenticated:', isAuth);
    if (isAuth) return true;
    this.router.navigate(['/login']);
    return false;
  }

}



//TODO: Borrar, solo para pruebas

// canActivate(): boolean {
//   // 🔓 Skip autenticación temporalmente
//   console.warn('⚠️ AuthGuard deshabilitado temporalmente para pruebas');
//   return true;
// }