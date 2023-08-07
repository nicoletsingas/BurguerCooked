import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient, private router: Router) { }

  async login (email: string, password: string): Promise<boolean> {
    const userLogin = { email, password }
    const response = await firstValueFrom(this.http.post<any>(this.apiUrl, userLogin));

    console.log(response);

    if (response.accessToken) {
      localStorage.setItem('token', response.accessToken); 
      localStorage.setItem('userEmail', email); 
      return true;
    } else {
      throw new Error('Login inválido');
    }
  }

  isUserLoggedIn(): boolean{
    return localStorage.getItem('token') !== null ;
  }

  // Obter o email do usuario logado
  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  // Armazenar o token no localStorage após o login
  storageToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Remover o token após logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    console.log('Logout com sucesso');
    this.router.navigate(['']);
  }

}
