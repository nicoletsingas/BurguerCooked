import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  products: any[] = []; // Tipo any[] para acomodar os dados da API
  currentProductType: string = 'Café da manhã'; 
  filteredProducts: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const apiURLProducts = 'http://localhost:8080/products';
      this.http.get<any[]>(apiURLProducts, { headers }).subscribe((data) => {
        this.products = data;
        this.filterProductsByType(this.currentProductType);
      },
      (error) => {
        console.error('Erro ao obter produtos da API:', error)
      });
    }
  }

  filterProductsByType(type: string){
    this.currentProductType = type;
    this.filteredProducts = this.products.filter(product => product.type === type);
  }
}
