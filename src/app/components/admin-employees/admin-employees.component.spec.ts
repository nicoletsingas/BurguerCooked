import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminEmployeesComponent } from './admin-employees.component';
import { throwError } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('AdminEmployeesComponent', () => {
  let component: AdminEmployeesComponent;
  let fixture: ComponentFixture<AdminEmployeesComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

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

  it ('should call getEmployees when selectedView is list', () => {
    spyOn(component, 'getEmployees');
    component.selectedView = 'list';
    component.onViewChange();
    expect(component.getEmployees).toHaveBeenCalled();
  });

  it ('should toggle editing mode for a user', () => {
    const user = {id: 1, editing: false};
    component.toggleEdit(user);
    expect(user.editing).toBe(true);
    expect(component.saveCancelVisible[user.id]).toBe(true);
  });

  it ('should cancel editing mode for a user', () => {
    const user = {id: 1, editing: true};
    component.cancelEdit(user);
    expect(user.editing).toBe(false);
    expect(component.saveCancelVisible[user.id]).toBe(false);
  });

  it ('should update users data', () => {
    const user = {id: 1, name: 'Eliana'};
    component.updateUsersData(user);
    const req = httpMock.expectOne(`https://burger-queen-api-mock-lac.vercel.app/users/${user.id}`);
    expect(req.request.method).toBe('PATCH');
  });

  it ('sould delete an user of API', () => {
    const user = {id: 1, name: 'Eliana'};
    component.deleteUser(user);
    const req = httpMock.expectOne(`https://burger-queen-api-mock-lac.vercel.app/users/${user.id}`);
    expect(req.request.method).toBe('DELETE');
  });

  it ('should show confirmation for user', () => {
    const user = {showConfirmation: false};
    component.deleteUserConfirmation(user);
    expect(user.showConfirmation).toBe(true);
  });

  it ('should cancel confirmation for user', () => {
    const user = {showConfirmation: true};
    component.cancelDeleteConfirmation(user);
    expect(user.showConfirmation).toBe(false);
  });

  it ('should register a employee', () => {
    const employeeData = {
      name: 'Nicole',
      email: 'admin2@burguercooked.com',
      password: '123456'
    };
    const apiUrlUsers = 'https://burger-queen-api-mock-lac.vercel.app/users';
    component.employeeData = { ...employeeData };
    component.selectedPosition = 'waiter';
    component.registerEmployees();
    const req = httpMock.expectOne(apiUrlUsers);
    expect(req.request.method).toBe('POST');
  });

});
