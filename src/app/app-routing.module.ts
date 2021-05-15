import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasPageComponent } from './ventas/ventas-page/ventas-page.component';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { LoginAccesoGuard } from './guards/login-acceso.guard';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'ventas', component: VentasPageComponent, canActivate: [LoginAccesoGuard]},
  {path: 'login', component: UserLoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
