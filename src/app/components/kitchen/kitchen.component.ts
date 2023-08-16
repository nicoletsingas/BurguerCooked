import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit{
  pendingOrders: any[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ){}

  ngOnInit(): void {
    this.getPendingOrders();
  }

  getPendingOrders() {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.http.get<any>('http://localhost:8080/orders', {headers}).subscribe((response) => {
        console.log('resposta da API', response)
        this.pendingOrders = response;
      },
      (error) => {
        console.error('Erro ao buscar pedidos', error)
      });
    } else {
      console.error('Token de autenticação não encontrado.');
    }
  }

}
