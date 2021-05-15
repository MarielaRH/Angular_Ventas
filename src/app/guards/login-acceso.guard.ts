import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../login/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAccesoGuard implements CanActivate {
  // importamos el router para redireccionar
  constructor(private router: Router, private service : UserService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      if(this.service.getToken() === undefined || this.service.getToken() === null){
        // si el usuario no esta logeado redireccionamos al login
        this.router.navigate(['login']);

        // no permitimos el acceso a  ventas
        return false
      }

      return true;
  }

}
