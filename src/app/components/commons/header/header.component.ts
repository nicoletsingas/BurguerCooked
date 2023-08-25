import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  userEmail: string | null;
  isLoggedIn: boolean = false;
  showOrderComponent: boolean = false;
  userRole: string | null;
  showReadyOrders: boolean = false;
  
  constructor(public authService: AuthService) {
    this.userEmail = authService.getUserEmail();
    this.isLoggedIn = authService.isUserLoggedIn();
    this.userRole = localStorage.getItem('userRole');
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    const newEmail = this.authService.getUserEmail();
    const newLoggedState = this.authService.isUserLoggedIn();

    if(this.userEmail !== newEmail || this.isLoggedIn !== newLoggedState) {
      this.userEmail = newEmail;
      this.isLoggedIn = newLoggedState;
      this.userRole = localStorage.getItem('userRole');
    }
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }

  toggleOrderComponent(show: boolean) {
    this.showOrderComponent = show;
  }

  toggleReadyOrders(show: boolean){
    this.showReadyOrders = show;
  }

}
