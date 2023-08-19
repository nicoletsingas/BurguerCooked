import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Order {
  client: string;
  table: string;
  waiter: string;
  status: string;
  products: [];
}

@Component({
  selector: 'app-ready-orders',
  templateUrl: './ready-orders.component.html',
  styleUrls: ['./ready-orders.component.css']
})
export class ReadyOrdersComponent implements OnInit {

  @Output() closeOrder = new EventEmitter<boolean>();

  completedOrders: any[] = [];

  constructor(
    private http: HttpClient
  ){}

  ngOnInit(): void {
    this.getCompletedOrders();
  }

  onCloseClick() {
    this.closeOrder.emit(false);
  }

  getCompletedOrders(){
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.http.get<any>('http://localhost:8080/orders', { headers }).subscribe((response) => {
        this.completedOrders = response.filter((order: Order) => order.status === 'completed');
      },
      (error) => {
        console.error('Erro ao buscar pedidos concluídos', error);
      });
    } else {
      console.error('Token de autenticação não encontrado.');
    }
  }

}
