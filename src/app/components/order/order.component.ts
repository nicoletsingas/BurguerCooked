import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  @Output() closeOrder = new EventEmitter<boolean>();

  onCloseClick() {
    this.closeOrder.emit(false);
  }
}
