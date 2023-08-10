import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private addedProducts: any[] = [];
  private productQuantities: { [productId: number]: number} = {};
  private addedProductSubject = new BehaviorSubject<any>(null);
  addedProduct$ = this.addedProductSubject.asObservable();

  addProduct(product: any) {
    const productId = product.id;
    if (this.addedProducts[productId]){
      this.addedProducts[productId].quantity++;
    } else {
      this.addedProducts[productId] = { product, quantity: 1 };
    }
    this.addedProductSubject.next(this.addedProducts);
  }

  getAddedProducts(){
    return Object.values(this.addedProducts);
  }

  setProductQuantities(quantities: {[productId: number]: number}){
    this.productQuantities = quantities;
  }

  getProductQuantities() {
    return this.productQuantities;
  }
}

