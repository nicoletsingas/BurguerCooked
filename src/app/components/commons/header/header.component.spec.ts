import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HeaderComponent]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(localStorage, 'getItem').and.returnValue('token');
  });

  it ('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it ('should verify user loggedIn', () => {
    spyOn(component.authService, 'getUserEmail').and.returnValue('nicole@burguercooked.com');
    spyOn(component.authService, 'isUserLoggedIn').and.returnValue(true);
    component.userEmail = 'teste@burguercooked.com';
    component.isLoggedIn = false;
    component.ngDoCheck();
    expect(component.userEmail).toBe('nicole@burguercooked.com');
    expect(component.isLoggedIn).toBe(true);
  });

  it ('should logout an user', () => {
    spyOn(component.authService, 'logout');
    component.logout();
    expect(component.authService.logout).toHaveBeenCalled();
    expect(component.isLoggedIn).toBe(false);
  });

});
