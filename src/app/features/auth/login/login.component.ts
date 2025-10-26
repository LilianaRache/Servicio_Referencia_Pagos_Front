import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthRequest } from 'src/app/core/models/auth-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  submit(event?: Event) {
    event?.preventDefault();
    this.loading = true;

    this.errorMessage = '';

    //TODO: ⚙️ 🔓 MODO DESARROLLO - Skip autenticación temporalmente
    const skipAuth = false
      ;
    if (skipAuth) {
      console.warn('⚠️ Autenticación deshabilitada temporalmente (modo desarrollo)');
      localStorage.setItem('jwtToken', 'fake-token-for-testing');
      this.router.navigate(['/references']);
      return;
    }

    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor ingresa usuario y contraseña.';
      return;
    }


    this.loading = true;

    const authRequest: AuthRequest = {
      username: this.username,
      password: this.password,
    };


    this.authService.login(authRequest).subscribe({
      next: (response) => {
        const token = response?.data?.token;

        if (token) {
          console.log('✅ TOKEN RECIBIDO:', token);
          this.authService.setToken(token);
          localStorage.setItem('jwtToken', token);

          console.log('➡️ Intentando navegar a /references...');

          this.router.navigate(['/references'])
            .then(ok => console.log('🔁 Navegación result:', ok))
            .catch(err => console.error('❌ Error al navegar:', err));
        } else {
          console.warn('⚠️ Token no recibido');
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        this.errorMessage = 'Credenciales inválidas o error del servidor.';
        this.loading = false;
      }
    });
  }
}

