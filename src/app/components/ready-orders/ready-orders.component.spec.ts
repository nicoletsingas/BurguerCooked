import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadyOrdersComponent } from './ready-orders.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ReadyOrdersComponent', () => {
  let component: ReadyOrdersComponent;
  let fixture: ComponentFixture<ReadyOrdersComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ReadyOrdersComponent]
    });
    fixture = TestBed.createComponent(ReadyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);

    spyOn(localStorage, 'getItem').and.returnValue('token');
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it ('should call getCompletedOrder on ngOnInit', () => {
    spyOn(component, 'getCompletedOrders');
    component.ngOnInit();
    expect(component.getCompletedOrders).toHaveBeenCalled();
  });

  it ('should emit false when onCloseClick is called', () => {
    spyOn(component.closeOrder, 'emit');
    component.onCloseClick();
    expect(component.closeOrder.emit).toHaveBeenCalledWith(false);
  });

  it ('should get completed orders', () => {
    const order = [{id: 1, status: 'completed'}]
    component.getCompletedOrders();
    const req = httpMock.expectOne('https://burger-queen-api-mock-lac.vercel.app/orders');
    req.flush(order);

    expect(req.request.method).toBe('GET');
    expect(component.completedOrders).toEqual(order);
  });

  it ('should call moveOrderToDeliveredList on successful order delivery', () => {
    const order = {id: 1, status: 'completed'}
    spyOn(component, 'moveOrderToDeliveredList');
    component.orderDelivered(order);
    const req = httpMock.expectOne(`https://burger-queen-api-mock-lac.vercel.app/orders/${order.id}`);
    req.flush({});

    expect(req.request.method).toBe('PATCH');
    expect(component.moveOrderToDeliveredList).toHaveBeenCalledWith(order);
  });

  it ('should move order to delivered list', () => {
    const order = { id: 1 };
    const completedOrders = [{ id: 1 }, { id: 2 }];
    const deliveredOrders: any[] = [];
    component.completedOrders = completedOrders;
    component.deliveredOrders = deliveredOrders;
    component.moveOrderToDeliveredList(order);

    expect(component.completedOrders.length).toBe(1);
    expect(component.deliveredOrders.length).toBe(1);
    expect(component.deliveredOrders[0]).toEqual(order);
  });

});
