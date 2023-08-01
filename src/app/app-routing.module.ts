import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './components/login/login.module';
import { MenuModule } from './components/menu/menu.module';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/login/login.module').then( m => LoginModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./components/menu/menu.module').then( m => MenuModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
