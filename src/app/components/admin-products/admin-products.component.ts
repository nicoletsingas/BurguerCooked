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
  saveCancelVisible: {[productId: number]: boolean} = {};
  selectedType: string = '';
  productsData = {
    id: '',
    name: '',
    price: '',
    image: '',
    details: '',
    dateEntry: ''
  };

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
      const apiUrlProducts = 'https://burger-queen-api-mock-lac.vercel.app/products';
      this.http.get<any>(apiUrlProducts, { headers }).subscribe((data) => {
        this.products = data;
        for (const product of data) {
          product.editing = false;
        }
      },
      (error) => {
        console.error('Erro ao obter produtos da API:', error);
      });
    }
  }

  toggleEdit(product: any) {
    product.editing = !product.editing;
    this.saveCancelVisible[product.id] = product.editing;
  }

  cancelEdit(product: any) {
    product.editing = false;
    this.saveCancelVisible[product.id] = false;
  }

  updateProductsData(product: any) {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const apiUrlProducts = `https://burger-queen-api-mock-lac.vercel.app/products/${product.id}`;
      this.http.patch<any[]>(apiUrlProducts, product, { headers }).subscribe((response) => {
        product.editing = false;
      },
      (error) => {
        console.error('Erro ao atualizar dados', error);
      });
    }
  }

  deleteProduct(product: any) {
    const token = localStorage.getItem('token');
    
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const apiUrlProducts = `https://burger-queen-api-mock-lac.vercel.app/products/${product.id}`;
      this.http.delete<any[]>(apiUrlProducts, { headers }).subscribe((response) => {
        this.products = this.products.filter(p => p.id !== product.id);
      },
      (error) => {
        console.error('Erro ao excluir produto', error);
      });
    }
  }

  deleteProductConfirmation(product: any) {
    product.showConfirmation = true;
  }

  cancelDeleteConfirmation(product: any) {
    product.showConfirmation = false;
  }

  registerProducts() {
    const token = localStorage.getItem('token');
    
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const apiUrlProducts = `https://sap-010-burger-queen-api-zzom.vercel.app/products`;
      const data = {
        ...this.productsData,
        type: this.selectedType
      };
      this.http.post<any[]>(apiUrlProducts, data, { headers }).subscribe((response)=> {
        this.productsData = {
          id: '',
          name: '',
          price: '',
          image: '',
          details: '',
          dateEntry: ''
        };
        this.selectedType = '';
      },
      (error) => {
        console.error('Erro ao cadastrar produto:', error);
      });
    }
  }


}
