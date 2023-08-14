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
  errorLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}
  
  async onLogin() {
    try {
      this.errorLogin = false;
      const isUserLoggedIn = await this.authService.login(this.email, this.password);
      if (isUserLoggedIn) {
        const userRole = localStorage.getItem('userRole');
        switch(userRole){
          case 'waiter':
            this.router.navigate(['/menu']);
            break;
          case 'chef':
            this.router.navigate(['/kitchen']);
            break;
          case 'admin':
            this.router.navigate(['/admin']);
            break;
          default:
            throw new Error('Role inválida');
        }     
      } else {
        this.errorLogin = true;
        throw new Error('Login inválido');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      this.errorLogin = true;
    }
  }
}
