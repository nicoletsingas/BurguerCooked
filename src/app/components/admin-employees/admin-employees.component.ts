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
  saveCancelVisible: {[userId: number]: boolean} = {};
  selectedPosition: string = '';
  employeeData = {
    name: '',
    email: '',
    password: ''
  };

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
        for (const user of data) {
          user.editing = false;
        }
      },
      (error) => {
        console.error('Erro ao obter usuarios da API:', error);
      });
    }
  }

  onViewChange() {
    if (this.selectedView === 'list') {
      this.getEmployees();
    }
  }

  toggleEdit(user: any) {
    user.editing = !user.editing;
    this.saveCancelVisible[user.id] = user.editing;
  }

  cancelEdit(user: any) {
    user.editing = false;
    this.saveCancelVisible[user.id] = false;
  }

  updateUsersData(user: any) {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const apiUrlUsers = `http://localhost:8080/users/${user.id}`;
      this.http.patch<any[]>(apiUrlUsers, user, { headers }).subscribe((response) => {
        user.editing = false;
      },
      (error) => {
        console.error('Erro ao atualizar dados', error);
      });
    }
  }

  deleteUser(user: any) {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const apiUrlUsers = `http://localhost:8080/users/${user.id}`;
      this.http.delete<any[]>(apiUrlUsers, { headers }).subscribe(() => {
        this.users = this.users.filter(u => u.id !== user.id);
      },
      (error) => {
        console.error('Erro ao excluir usuário', error);
      });
    }
  }

  deleteUserConfirmation(user: any) {
    user.showConfirmation = true;
  }

  cancelDeleteConfirmation(user: any) {
    user.showConfirmation = false;
  }

  registerEmployees() {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const apiUrlUsers = 'http://localhost:8080/users';
      const data = {
        ...this.employeeData,
        role: this.selectedPosition
      };
      this.http.post<any[]>(apiUrlUsers, data, { headers }).subscribe((response)=> {
        this.employeeData = {
          name: '',
          email: '',
          password: ''
        };
        this.selectedPosition = '';
      },
      (error) => {
        console.error('Erro ao cadastrar funcionário:', error);
      });
    }

  }

}
