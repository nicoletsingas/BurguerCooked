import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
 // @Output() productAdded = new EventEmitter<any>();

  products: any[] = []; 
  currentProductType: string = 'Café da manhã'; 
  filteredProducts: any[] = [];
  productQuantities: { [productId: number ]: number} = {}

  constructor(private http: HttpClient, private authService: AuthService, private orderService: OrderService) {}

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
        this.products.forEach(product => {
          this.productQuantities[product.id] = 0;
        })
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

  addProduct(productId: number){
    this.productQuantities[productId]++;
    const addedProduct = this.products.find(product => product.id === productId);
    this.orderService.addProduct(addedProduct);
    this.orderService.setProductQuantities(this.productQuantities);
  }

  removeProduct(productId: number){
    if (this.productQuantities[productId] > 0){
      this.productQuantities[productId]--;
    }
  }

}
