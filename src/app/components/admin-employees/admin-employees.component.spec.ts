import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeesComponent } from './admin-employees.component';

describe('AdminEmployeesComponent', () => {
  let component: AdminEmployeesComponent;
  let fixture: ComponentFixture<AdminEmployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEmployeesComponent]
    });
    fixture = TestBed.createComponent(AdminEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
