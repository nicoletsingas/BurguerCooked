import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserAuthenticated: boolean = false;
  private apiUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient) { }

  async login (email: string, password: string): Promise<boolean> {
    const userLogin = { email, password }
    const response = await firstValueFrom(this.http.post<any>(this.apiUrl, userLogin));

    console.log(response);

    if (response.token) {
      localStorage.setItem('token', response.token);
      this.isUserAuthenticated = true;
      return true;
    } else {
      throw new Error('Login inválido');
    }
  }

  // Armazenar o token no localStorage após o login
  storageToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  logout() {
    localStorage.removeItem('authToken');
  }

}
