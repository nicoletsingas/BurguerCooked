import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '', 
    component: LoginComponent
  },
  {
    path: 'menu',
    component: MenuComponent, canActivate: [AuthGuard], data: { allowedRoles: ['waiter']}
  },
  {
    path: 'kitchen',
    component: KitchenComponent, canActivate: [AuthGuard], data: { allowedRoles: ['chef']}
  }, 
  {
    path: 'admin',
    component: AdminComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin']}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
