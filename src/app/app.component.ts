import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'referenced-payments-frontend';
  
  constructor(private auth: AuthService) {}

  ngOnInit() {
  setInterval(() => {
    if (!this.auth.isAuthenticated()) {
      this.auth.logout();
    }
  }, 60_000);
  //60_000); -> chequea cada minuto
}

}
