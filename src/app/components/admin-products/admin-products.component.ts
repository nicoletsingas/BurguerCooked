import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  selectedView: string = 'list';
  products: any [] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const apiUrlProducts = 'http://localhost:8080/products';
      this.http.get<any>(apiUrlProducts, { headers }).subscribe((response) => {
        this.products = response;
      },
      (error) => {
        console.error('Erro ao obter produtos da API:', error);
      });
    }
  }


}
