import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  activeComponent: string = 'employees';

  showEmployees() {
    this.activeComponent = 'employees';
  }

  showProducts() {
    this.activeComponent = 'products';
  }

}
