import { Component, EventEmitter, OnDestroy, Output, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnDestroy {
  @Output() closeOrder = new EventEmitter<boolean>();

  constructor(
    @Inject(DOCUMENT)
    private domDocument: Document,
    private orderService: OrderService,
    private authService: AuthService,
    private http: HttpClient,
    ) {
    this.subscription = this.orderService.addedProduct$.subscribe(products => {
      this.addedProducts = this.orderService.getAddedProducts();
    });
  }

  addedProducts: { product: any, quantity: number }[] = [];
  private subscription: Subscription;
  loggedInUsername: string | null = '';
  clientName: string = '';
  selectedTable: string = '';
  sentToKitchen: boolean = false;

  ngOnInit() {
    this.loggedInUsername = this.authService.getUsername();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCloseClick() {
    this.closeOrder.emit(false);
  }

  calculateSubtotal(): number {
    return this.addedProducts.reduce((subtotal, item) => {
      return subtotal + (item.product.price * item.quantity);
    }, 0);
  }

  calculateTax(subtotal: number): number {
    return subtotal * 0.1; //calcular 10% sob o subtotal
  }  

  calculateTotal(subtotal: number, tax: number): number {
    return subtotal + tax;
  }

  deleteProduct(productId: number) {
    this.orderService.deleteProduct(productId);
  }

  sendOrderToAPI() {
    const token = localStorage.getItem('token');
    const order = {
      client: this.clientName,
      table: this.selectedTable,
      waiter: this.loggedInUsername,
      status: 'pending',
      completedDate: '',
      orderDelivered: '',
      products: this.addedProducts.map(item => {
        return {
          name: item.product.name,
          quantity: item.quantity,
        };
      })
    };
    
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      this.http.post('http://localhost:8080/orders', order, {headers}).subscribe(
      (response) => {
        console.log(response + 'enviado a API');
        this.sentToKitchen = true;
        setTimeout(() => {
          this.sentToKitchen = false;
          this.domDocument.location.reload();
        }, 4000);
        this.clientName = '';
        this.selectedTable = '';
        this.addedProducts = [];
      },
      (error) => {
        console.error('Falha ao enviar resposta para a API:', error.message)
      }
    );
    } else {
      console.error('Token de autenticação não encontrado.');
    }
  }

}
