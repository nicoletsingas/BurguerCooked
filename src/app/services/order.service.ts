import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private addedProducts: any[] = [];
  private productQuantities: { [productId: number]: number} = {};
  private addedProductSubject = new BehaviorSubject<any>(null);
  private productQuantitiesSubject = new BehaviorSubject<{[productId: number]: number}>({});
  addedProduct$ = this.addedProductSubject.asObservable();
  productQuantities$ = this.productQuantitiesSubject.asObservable();

  addProduct(product: any) {
    const productId = product.id;
    if (this.addedProducts[productId]){
      this.addedProducts[productId].quantity++;
    } else {
      this.addedProducts[productId] = { product, quantity: 1 };
    }
    this.updateProductQuantities();
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

  removeProduct(productId: number) {
    if (this.addedProducts[productId]) {
      if (this.addedProducts[productId].quantity > 1) {
        this.addedProducts[productId].quantity--;
      } else {
        delete this.addedProducts[productId];
      }
      this.addedProductSubject.next(this.addedProducts);
    }
  }

  deleteProduct(productId: number) {
    if (this.addedProducts[productId]) {
      delete this.addedProducts[productId];
      this.updateProductQuantities();
      this.addedProductSubject.next(this.addedProducts);
    }
  }

  private updateProductQuantities() {
    const quantities: {[productIs: number]: number} = {};
    for (const addedProduct of Object.values(this.addedProducts)) {
      quantities[addedProduct.product.id] = addedProduct.quantity;
    }
    this.productQuantitiesSubject.next(quantities);
  }

}

