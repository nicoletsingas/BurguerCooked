import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ready-orders',
  templateUrl: './ready-orders.component.html',
  styleUrls: ['./ready-orders.component.css']
})
export class ReadyOrdersComponent {

  @Input() completedOrders: any[] = [];
  @Output() closeOrder = new EventEmitter<boolean>();


  onCloseClick() {
    this.closeOrder.emit(false);
  }


}
