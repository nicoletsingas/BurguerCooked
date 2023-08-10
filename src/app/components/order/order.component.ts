import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnDestroy {
  @Output() closeOrder = new EventEmitter<boolean>();

  addedProducts: { product: any, quantity: number }[] = [];
  private subscription: Subscription;

  constructor(private orderService: OrderService) {
    this.subscription = this.orderService.addedProduct$.subscribe(products => {
      this.addedProducts = this.orderService.getAddedProducts();
    });
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


}
