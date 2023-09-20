import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Order {
  client: string;
  table: string;
  waiter: string;
  status: string;
  orderDelivered: string;
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
  deliveredOrders: any[] = [];

  constructor(
    private http: HttpClient
  ){}

  ngOnInit(): void {
    this.getCompletedOrders();
  }

  onCloseClick() {
    this.closeOrder.emit(false);
  }

  getCompletedOrders() {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.http.get<any>('https://sap-010-burger-queen-api-zzom.vercel.app/orders', { headers }).subscribe((response) => {
        this.completedOrders = response.filter((order: Order) => order.status === 'completed' && order.orderDelivered !== 'delivered');
      },
      (error) => {
        console.error('Erro ao buscar pedidos concluídos', error);
      });
    } else {
      console.error('Token de autenticação não encontrado.');
    }
  }

  orderDelivered(order: any) {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      const updatedOrder = {
        ...order,
        orderDelivered: 'delivered'
      };

      this.http.patch<any>(`https://sap-010-burger-queen-api-zzom.vercel.app/orders/${order.id}`, updatedOrder, {headers}).subscribe(() => {
        this.moveOrderToDeliveredList(order);
      },
      (error) => {
        console.error('Erro ao buscar pedidos entregues', error);
      });
    } else {
      console.error('Token de autenticação não encontrado.');
    }
  }

  moveOrderToDeliveredList(order: any) {
    const index = this.completedOrders.findIndex(o => o.id === order.id);
    if (index !== -1) {
      const deliveredOrder = this.completedOrders.splice(index, 1)[0];
      this.deliveredOrders.push(deliveredOrder);
    }
  }

}
