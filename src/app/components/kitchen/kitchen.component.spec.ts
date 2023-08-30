import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { KitchenComponent } from './kitchen.component';

describe('KitchenComponent', () => {
  let component: KitchenComponent;
  let fixture: ComponentFixture<KitchenComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [KitchenComponent]
    });
    fixture = TestBed.createComponent(KitchenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
    spyOn(localStorage, 'getItem').and.returnValue('token');
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it ('should get all pending orders from API', () => {
    const pendingOrders = [{id: 1, status: 'pending'}]
    component.getPendingOrders();
    const req = httpMock.expectOne('http://localhost:8080/orders');
    req.flush(pendingOrders);
    expect(component.pendingOrders).toEqual(pendingOrders)
    expect(req.request.method).toBe('GET');
  });

  it ('should handle error when cant get pending orders', () => {
    component.getPendingOrders();
    const req = httpMock.expectOne('http://localhost:8080/orders');
    req.error(new ErrorEvent('Erro ao buscar pedidos pendentes'));
    expect(component.pendingOrders).toEqual([]);
  });

  it ('should mark an order as completed', () => {
    const order = {id: 1, status: 'pending'}
    spyOn(component, 'moveOrderToCompletedList');
    component.markOrderAsCompleted(order);
    const req = httpMock.expectOne(`http://localhost:8080/orders/${order.id}`);
    req.flush({});
    expect(req.request.method).toBe('PATCH');
    expect(component.moveOrderToCompletedList).toHaveBeenCalledWith(order);
  });

  it ('should move order to completed list', () => {
    const order = {id: 1, completeddate: ''};
    const initialCompletedOrdersLength = component.completedOrders.length;
    const initialPendingOrdersLength = component.pendingOrders.length;
    component.moveOrderToCompletedList(order);
    expect(component.completedOrders.length).toBe(initialCompletedOrdersLength + 1);
    expect(component.completedOrders[initialCompletedOrdersLength].id).toBe(order.id);
    expect(component.pendingOrders.length).toBe(initialPendingOrdersLength - 0);
    expect(component.pendingOrders.some(pendingOrder => pendingOrder.id === order.id)).toBe(false);
  });

  it ('should get the completed orders list', () => {
    const order = [{id: 1, status: 'completed'}]
    component.getCompletedOrders();
    const req = httpMock.expectOne('http://localhost:8080/orders');
    req.flush(order);
    expect(req.request.method).toBe('GET');
    expect(component.completedOrders).toEqual(order);
  });

});
