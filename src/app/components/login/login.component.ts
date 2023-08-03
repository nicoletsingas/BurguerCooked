import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  
  async onLogin() {
    try {
      const isUserLoggedIn = await this.authService.login(this.email, this.password);
      if (isUserLoggedIn) {
        console.log('Login com sucesso');
        this.router.navigate(['/menu']);
      } else {
        throw new Error('Login inválido');
      }
    } catch (error) {
      console.error('Erro no login:', error);
    }
  }
}
