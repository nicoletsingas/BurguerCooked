import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminProductsComponent } from './admin-products.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AdminProductsComponent', () => {
  let component: AdminProductsComponent;
  let fixture: ComponentFixture<AdminProductsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [AdminProductsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductsComponent)
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
    spyOn(localStorage, 'getItem').and.returnValue('token');
  });

  it ('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it ('should get all products of API', () => {
    const products = [{id: 1, name: 'bolacha', price: 2 }];
    component.getProducts();
    const req = httpMock.expectOne(`http://localhost:8080/products`);
    req.flush(products);
    expect(component.products).toEqual(products)
    expect(req.request.method).toBe('GET');
  });

  it ('should update products data', () => {
    const product = {id: 1, name: 'bolacha', price: 2 }
    component.updateProductsData(product);
    const req = httpMock.expectOne(`http://localhost:8080/products/${product.id}`);
    expect(req.request.method).toBe('PATCH');
  });

  it ('should delete a products of API', () => {
    const product = {id: 1, name: 'bolacha', price: 2 }
    component.deleteProduct(product);
    const req = httpMock.expectOne(`http://localhost:8080/products/${product.id}`);
    expect(req.request.method).toBe('DELETE');
  });

  it ('should register a new product', () => {
    const productsData = {
      id: '15',
      name: 'Chicken Burguer',
      price: '12',
      image: 'https://p.turbosquid.com/ts-thumb/EY/bxVZ05/5v/chicken_burger_01/jpg/1665047779/600x600/fit_q87/1a1d4867dfef81b7eeffe61563312328eecc9225/chicken_burger_01.jpg',
      details: 'Hamburguer de frango com salada e queijo',
      dateEntry: '25/08/2023'
    };
    component.productsData = { ...productsData };
    component.selectedType = 'Almoço';
    component.registerProducts()
    const req = httpMock.expectOne('http://localhost:8080/products');
    expect(req.request.method).toBe('POST');
  });

});
