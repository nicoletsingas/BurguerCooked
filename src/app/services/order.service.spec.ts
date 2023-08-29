import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let orderService: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    orderService = TestBed.inject(OrderService);
  });

  it ('should created a service', () => {
    expect(orderService).toBeTruthy();
  });

  it ('should add a product', () => {
    const product = {id: 1};
    orderService.addProduct(product)
    const addedProducts = orderService.getAddedProducts();
    expect(addedProducts.length).toBe(1);
    expect(addedProducts[0].product).toBe(product);
    expect(addedProducts[0].quantity).toBe(1);
  });

  it ('should get added products', () => {
    const addedProducts = orderService.getAddedProducts();
    expect(addedProducts.length).toBe(0);
  });

  it ('should set product quantities', () => {
    const quantities = {1: 5, 2: 3};
    orderService.setProductQuantities(quantities);
    const productQuantities = orderService.getProductQuantities();
    expect(productQuantities).toEqual(quantities);
  });

  it ('should get product quantities', () => {
    const quantities = orderService.getProductQuantities();
    expect(quantities).toEqual({});
  });

  it ('should remove a product', () => {
    const produId = 1;
    const product = {id: produId};
    orderService.addProduct(product);
    orderService.removeProduct(produId);
    const addedProducts = orderService.getAddedProducts();
    expect(addedProducts.length).toBe(0);
  });

  it ('should delete a product', () => {
    const produId = 1;
    const product = {id: produId};
    orderService.addProduct(product);
    orderService.deleteProduct(produId);
    const addedProducts = orderService.getAddedProducts();
    expect(addedProducts.length).toBe(0);
  });

  it ('should update product quantities', () => {
    const addedProducts = {
      1: { product: { id: 1 }, quantity: 5 },
      2: { product: { id: 2 }, quantity: 10 }
    };

    spyOn(orderService.productQuantitiesSubject, 'next');
    (orderService as any)['addedProducts'] = addedProducts;
    orderService.updateProductQuantities();
    expect(orderService.productQuantitiesSubject.next).toHaveBeenCalledWith({ 1: 5, 2: 10 });
  });

});
