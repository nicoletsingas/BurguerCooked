import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MenuComponent } from './menu.component';
import { AppModule } from 'src/app/app.module';
import { OrderService } from 'src/app/services/order.service';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let httpMock: HttpTestingController;
  let orderService: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule],
      declarations: [MenuComponent],
      providers: [OrderService]
    });

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
    orderService = TestBed.inject(OrderService);

    spyOn(localStorage, 'getItem').and.returnValue('token');
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it ('should get all products from API', () => {
    const products = [
      {id: 1, name: 'HotDog', type: 'Almoço'}
    ];
    component.getProducts();
    const req = httpMock.expectOne('http://localhost:8080/products');
    req.flush(products); 
    expect(component.products).toEqual(products);
    expect(req.request.method).toBe('GET');
  });

  it ('should filter products by type', () => {
    const products = [
      {id: 1, name: 'HotDog', type: 'Almoço'},
      {id: 2, name: 'Café americano', type: 'Café da manhã'},
      {id: 3, name: 'Batata frita', type: 'Almoço'}
    ];
    component.products = products;
    component.filterProductsByType('Almoço');

    expect(component.currentProductType).toEqual('Almoço');
    expect(component.filteredProducts).toEqual([{ id: 1, name: 'HotDog', type: 'Almoço' },{ id: 3, name: 'Batata frita', type: 'Almoço' }]);
  });

  it ('should add a product', () => {
    const productId = 1;

    spyOn(orderService, 'addProduct');
    component.productQuantities[productId] = 0;
    component.addProduct(productId);

    expect(component.productQuantities[productId]).toBe(1);
    expect(orderService.addProduct).toHaveBeenCalledWith(component.products.find(product => product.id === productId));
  });

  it ('should remove a product', () => {
    const productId = 1;
    spyOn(orderService, 'removeProduct');
    component.productQuantities[productId] = 1;
    component.removeProduct(productId);

    expect(component.productQuantities[productId]).toBe(0);
    expect(orderService.removeProduct).toHaveBeenCalledWith(productId);
  });

});
