import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { OrderComponent } from './order.component';
import { AppModule } from 'src/app/app.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from 'src/app/services/order.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let httpMock: HttpTestingController;
  let orderService: OrderService;
  let httpClient: HttpClient; 
  let mockLocation: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule],
      declarations: [OrderComponent],
      providers: [
        OrderService,
        HttpClient,
        { provide: Location, useValue: mockLocation }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
    orderService = TestBed.inject(OrderService);
    httpClient = TestBed.inject(HttpClient);

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

  it ('should call orderService.deleteProduct and delete a product', () => {
    const productId = 1;
    spyOn(orderService, 'deleteProduct');
    component.deleteProduct(productId);
    expect(orderService.deleteProduct).toHaveBeenCalledWith(productId);
  });

  it ('should handle an error when send orders to api fails', () => {
    const mockError = { message: 'Error message' };

    spyOn(httpClient, 'post').and.returnValue(throwError(mockError));
    spyOn(console, 'error');

    component.sendOrderToAPI();
    expect(httpClient.post).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      'Falha ao enviar resposta para a API:',
      mockError.message
    );
  });

  it ('should send orders to Api and reset values', () => {
    component.addedProducts = [{ product: { name: 'HotDog' }, quantity: 2 }];
    component.sendOrderToAPI();
    const req = httpMock.expectOne('http://localhost:8080/orders');
    req.flush({});
    expect(req.request.method).toBe('POST');
    expect(component.sentToKitchen).toBe(true);
  });
});
