import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminEmployeesComponent } from '../admin-employees/admin-employees.component';
import { AdminProductsComponent } from '../admin-products/admin-products.component';
import { AdminComponent } from './admin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [AdminComponent, AdminEmployeesComponent, AdminProductsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch to employees component', () => {
    component.showEmployees();
    expect(component.activeComponent).toBe('employees');
  });

  it('should switch to products component', () => {
    component.showProducts();
    expect(component.activeComponent).toBe('products');
  });

});
