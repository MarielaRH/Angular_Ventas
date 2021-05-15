import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../login/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginAccesoGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  //Método que se encargará de restringir el acceso a la ruta ventas si el usuario no esta logeado
  canActivate(): boolean {
    //validamos si el usuario esta logeado y si no lo mandamos al login
    if (
      this.userService.getToken() === undefined ||
      this.userService.getToken() === null
    ) {
      // si el usuario no esta logeado redireccionamos al login
      this.router.navigate(['login']);

      // no permitimos el acceso a  ventas
      return false;
    }
    //permitimos le acceso a ventas
    return true;
  }
}
