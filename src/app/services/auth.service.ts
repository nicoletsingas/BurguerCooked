import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl = 'https://burger-queen-api-mock-lac.vercel.app/login';

  constructor(private http: HttpClient, private router: Router) { }

  async login (email: string, password: string): Promise<boolean> {
    const userLogin = { email, password }
    const response = await firstValueFrom(this.http.post<any>(this.apiUrl, userLogin));

    if (response.accessToken) {
      localStorage.setItem('token', response.accessToken); 
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRole', response.user.role);
      localStorage.setItem('username', response.user.name);
      return true;
    } else {
      throw new Error('Login inválido');
    }
  }

  isUserLoggedIn(): boolean{
    return localStorage.getItem('token') !== null ;
  }

  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  storageToken(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    this.router.navigate(['']);
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

}
