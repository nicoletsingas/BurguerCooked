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
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the correct route on successful login', async () => {
    authService.login.and.resolveTo(true);
    localStorage.setItem('userRole', 'waiter');
    await component.onLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/menu']);
  });

  it('should navigate to the correct route based on user role', async () => {
    authService.login.and.resolveTo(true);
    localStorage.setItem('userRole', 'chef');
    await component.onLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/kitchen']);
  });

  it('should navigate to the correct route for admin role', async () => {
    authService.login.and.resolveTo(true);
    localStorage.setItem('userRole', 'admin');
    await component.onLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/admin']);
  });

  it('should set errorLogin to true on login failure', async () => {
    authService.login.and.resolveTo(false);
    await component.onLogin();
    expect(component.errorLogin).toBeTrue();
  });

});
 