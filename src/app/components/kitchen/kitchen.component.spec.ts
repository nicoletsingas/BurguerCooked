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
  })


});
