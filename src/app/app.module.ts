import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/commons/header/header.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { AdminComponent } from './components/admin/admin.component';
import { ReadyOrdersComponent } from './components/ready-orders/ready-orders.component';
import { AdminEmployeesComponent } from './components/admin-employees/admin-employees.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { OrderService } from './services/order.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OrderComponent,
    LoginComponent,
    MenuComponent,
    KitchenComponent,
    AdminComponent,
    ReadyOrdersComponent,
    AdminEmployeesComponent,
    AdminProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  exports: [
    AppComponent,
    HeaderComponent,
    OrderComponent,
    LoginComponent,
    MenuComponent,
    KitchenComponent,
    AdminComponent,
    ReadyOrdersComponent,
    AdminEmployeesComponent,
    AdminProductsComponent,
  ],
  providers: [
    AuthService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
