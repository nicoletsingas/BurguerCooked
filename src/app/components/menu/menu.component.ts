import { Component, OnInit, OnDestroy} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { Subscription } from 'rxjs';
import { BREAKPOINT } from '../constants';
import { ResizeService } from 'src/app/services/resize.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy{
  
  products: any[] = []; 
  currentProductType: string = 'Café da manhã'; 
  filteredProducts: any[] = [];
  productQuantities: { [productId: number ]: number} = {};
  private productQuantitiesSubscription: Subscription = Subscription.EMPTY;
  isAboveBreakpoint: boolean = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    public orderService: OrderService,
    private resizeService: ResizeService
  ) {}

  ngOnInit(): void {
    this.productQuantitiesSubscription = this.orderService.productQuantities$.subscribe((quantities) => {
    this.productQuantities = quantities;
    });
    this.getProducts();

    this.isAboveBreakpoint = this.resizeService.isScreenAboveBreakpoint();
    this.resizeService.getScreenWidth().subscribe(screenWidth => {
      this.isAboveBreakpoint = screenWidth > BREAKPOINT;
    });
  }

  ngOnDestroy() {
    this.productQuantitiesSubscription.unsubscribe();
  }

  getProducts() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const apiUrlProducts = 'https://burger-queen-api-mock-lac.vercel.app/products';
      this.http.get<any[]>(apiUrlProducts, { headers }).subscribe((data) => {
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

  addProduct(productId: number){
    this.productQuantities[productId]++;
    const addedProduct = this.products.find(product => product.id === productId);
    this.orderService.addProduct(addedProduct);
    this.orderService.setProductQuantities(this.productQuantities);
  }

  removeProduct(productId: number){
    if (this.productQuantities[productId] > 0){
      this.productQuantities[productId]--;
      this.orderService.removeProduct(productId);
    }
  }
  
}
