// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return true;
//   }
  
// }

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  // canActivate(): boolean {
  //   if (this.auth.isAuthenticated()) return true;
  //   this.router.navigate(['/login']);
  //   return false;
  // }

   //TODO: Borrar, solo para pruebas

  canActivate(): boolean {
    // 🔓 Skip autenticación temporalmente
    console.warn('⚠️ AuthGuard deshabilitado temporalmente para pruebas');
    return true;
  }
}
