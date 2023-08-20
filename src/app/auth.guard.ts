import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  implements CanActivate{

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean | UrlTree {
    if (!this.authService.isUserLoggedIn()) {
      return this.router.parseUrl('');
    }

    const userRole = localStorage.getItem('userRole')!;
    const allowedRoles = next.data['allowedRoles'] as Array<string>;

    if (allowedRoles.includes(userRole)) {
      return true;
    } else {
      switch (userRole) {
        case 'waiter':
          return this.router.parseUrl('/menu');
        case 'chef':
          return this.router.parseUrl('/kitchen');
        case 'admin':
          return this.router.parseUrl('/admin');
        default:
          return this.router.parseUrl('');
      }
    }
  }
}
