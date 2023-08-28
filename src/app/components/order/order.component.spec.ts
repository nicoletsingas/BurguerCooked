import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { OrderComponent } from './order.component';
import { AppModule } from 'src/app/app.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from 'src/app/services/order.service';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let httpMock: HttpTestingController;
  let orderService: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule],
      declarations: [OrderComponent],
      providers: [OrderService]
    });

    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
    orderService = TestBed.inject(OrderService);

    spyOn(localStorage, 'getItem').and.returnValue('token');
  });

  it ('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should calculate subtotal', () => {
    component.addedProducts = [
      { product: { price: 10 }, quantity: 2 },
      { product: { price: 15 }, quantity: 3 }
    ];
    const subtotal = component.calculateSubtotal();
    expect(subtotal).toEqual(10 * 2 + 15 * 3);
  });

  it ('should calculate 10% tax', () => {
    const tax = component.calculateTax(100);
    expect(tax).toEqual(100 * 0.1);
  });

  it ('should calculate total', () => {
    const total = component.calculateTotal(100, 10);
    expect(total).toEqual(100 + 10);
  });

  it ('should send orders to Api and reset values', () => {
    component.clientName = 'Nicole';
    component.selectedTable =  '1';
    component.loggedInUsername = 'Floquinho'
    component.addedProducts = [{ product: { name: 'HotDog' }, quantity: 2 }];
    component.sendOrderToAPI();
    const req = httpMock.expectOne('http://localhost:8080/orders');
    //req.flush({});
    expect(req.request.method).toBe('POST');
    //expect(component.sentToKitchen).toBe(true);
  });


});
