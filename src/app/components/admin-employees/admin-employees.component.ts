import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-employees',
  templateUrl: './admin-employees.component.html',
  styleUrls: ['./admin-employees.component.css']
})
export class AdminEmployeesComponent implements OnInit {

  selectedView: string = 'list';
  users: any[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

    ngOnInit(): void {
      this.getEmployees();
    }

  getEmployees() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const apiUrlUsers = 'http://localhost:8080/users';
      this.http.get<any[]>(apiUrlUsers, { headers }).subscribe((data) => {
        this.users = data;
        console.log('usuarios:', this.users)
      },
      (error) => {
        console.error('Erro ao obter produtos da API:', error)
      });
    }
  }

  onViewChange() {
    if (this.selectedView === 'list') {
      this.getEmployees();
    }
  }


}
