import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl = 'https://sap-010-burger-queen-api-zzom.vercel.app/login';

  constructor(private http: HttpClient, private router: Router) { }

  async login (email: string, password: string): Promise<boolean> {
    console.log('teste')
    const userLogin = { email, password }
    const response = await firstValueFrom(this.http.post<any>(this.apiUrl, userLogin));
    console.log('entrou na função', response)

    if (response.token) {
      localStorage.setItem('token', response.token); 
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRole', response.role);
      localStorage.setItem('username', response.name);
      return true;
    } else {
      console.log('caiu no else')
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
