import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerMock }
      ]
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it ('should be created a service', () => {
    expect(authService).toBeTruthy();
  });

  it ('should log the user and store token', () => {
    const email = 'waiter@burguercooked.com';
    const password = '123456789';
    const mockResponse = {
      accessToken: 'mockToken',
      user: { 
        role: 'waiter',
        name: 'floquinho'
      } 
    };
    authService.login(email, password).then(result => {
      expect(result).toBeTrue();
      expect(localStorage.getItem('token')).toEqual(mockResponse.accessToken);
      expect(localStorage.getItem('userEmail')).toEqual(email);
      expect(localStorage.getItem('userRole')).toEqual(mockResponse.user.role);
      expect(localStorage.getItem('username')).toEqual(mockResponse.user.name);
    });
    const req = httpMock.expectOne(authService.apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it ('should check if user is logged in', () => {
    localStorage.setItem('token', 'mockToken');
    expect(authService.isUserLoggedIn()).toBeTrue();
  });

  it ('should get user email when available', () => {
    spyOn(localStorage, 'getItem').and.returnValue('test@burguercooked.com');
    const userEmail = authService.getUserEmail();
    expect(userEmail).toBe('test@burguercooked.com');
  });

  it ('should store token in localStorage', () => {
    const mockToken = 'token';
    authService.storageToken(mockToken);
    expect(localStorage.getItem('token')).toBe('token');
  });

  it ('should remove token on logout', () => {
    spyOn(localStorage, 'removeItem');
    authService.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('userEmail');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  }); 
  
});


