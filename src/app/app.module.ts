import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OrderComponent,
    LoginComponent,
    MenuComponent,
    KitchenComponent,
    AdminComponent,
    ReadyOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    AppComponent,
    HeaderComponent,
    OrderComponent,
    LoginComponent,
    MenuComponent,
    KitchenComponent,
    AdminComponent,
    ReadyOrdersComponent
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
