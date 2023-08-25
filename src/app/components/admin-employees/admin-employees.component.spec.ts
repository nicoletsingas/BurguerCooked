import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminEmployeesComponent } from './admin-employees.component';

describe('AdminEmployeesComponent', () => {
  let component: AdminEmployeesComponent;
  let fixture: ComponentFixture<AdminEmployeesComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [AdminEmployeesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
    spyOn(localStorage, 'getItem').and.returnValue('token');
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it ('should call getEmployees on view change', () => {
    spyOn(component, 'getEmployees');
    component.selectedView = 'list';
    component.onViewChange();
    expect(component.getEmployees).toHaveBeenCalled();
  });

  it ('should update users data', () => {
    const user = {id: 1, name: 'Eliana'};
    component.updateUsersData(user);
    const req = httpMock.expectOne(`http://localhost:8080/users/${user.id}`);
    expect(req.request.method).toBe('PATCH');
  });

  it ('sould delete an user of API', () => {
    const user = {id: 1, name: 'Eliana'};
    component.deleteUser(user);
    const req = httpMock.expectOne(`http://localhost:8080/users/${user.id}`);
    expect(req.request.method).toBe('DELETE');
  })

  it ('should register a employee', () => {
    const employeeData = {
      name: 'Nicole',
      email: 'admin2@burguercooked.com',
      password: '123456'
    };
    const apiUrlUsers = 'http://localhost:8080/users';
    component.employeeData = { ...employeeData };
    component.selectedPosition = 'waiter';
    component.registerEmployees()
    const req = httpMock.expectOne(apiUrlUsers);
    expect(req.request.method).toBe('POST');
  });

});
