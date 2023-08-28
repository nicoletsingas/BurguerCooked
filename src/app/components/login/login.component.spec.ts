import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authService =  jasmine.createSpyObj('AuthService', ['login', 'isUserLoggedIn']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'userRole') {
        return 'waiter';
      }
      return null;
    });
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to correct route when login success', async () => {
    authService.login.and.returnValue(Promise.resolve(true));
    authService.isUserLoggedIn.and.returnValue(true);
    component.email = 'test@burguercooked.com';
    component.password = 'password123';
    await component.onLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/menu']);
  });

});
