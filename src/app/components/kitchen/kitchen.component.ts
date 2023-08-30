import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

interface Order {
  client: string;
  table: string;
  waiter: string;
  status: string;
  products: [];
}

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit{
  pendingOrders: any[] = [];
  completedOrders: any[] = [];
  showPendingOrders: boolean = true;
  showImage: boolean = false; 

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.getPendingOrders();
    this.getCompletedOrders();
  }

  getPendingOrders() {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.http.get<any>('https://burger-queen-api-mock-lac.vercel.app/orders', {headers}).subscribe((response) => {
        this.pendingOrders = response.filter((order: Order) => order.status === 'pending');
        this.showImage = this.pendingOrders.length === 0;
      },
      (error) => {
        console.error('Erro ao buscar pedidos', error)
      });
    } else {
      console.error('Token de autenticação não encontrado.');
    }
  }

  markOrderAsCompleted(order: any) {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      const updatedOrder = {
        ...order,
        status: 'completed',
        completedDate: new Date().toLocaleDateString()
      };

      this.http.patch<any>(`https://burger-queen-api-mock-lac.vercel.app/orders/${order.id}`, updatedOrder, { headers }).subscribe(() => {
        this.moveOrderToCompletedList(order);
      },
      (error) => {
        console.error('Erro ao marcar pedido como concluído', error);
      });
    } else {
      console.error('Token de autenticação não encontrado.');
    }
  }

  moveOrderToCompletedList(order: any) {
    const completionTime = new Date().toLocaleDateString();
    order.completedDate = completionTime;
    this.completedOrders.push(order);
    this.pendingOrders = this.pendingOrders.filter((pendingOrder) => pendingOrder.id !== order.id);
  }

  getCompletedOrders() {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.http.get<any>('https://burger-queen-api-mock-lac.vercel.app/orders', { headers }).subscribe((response) => {
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
