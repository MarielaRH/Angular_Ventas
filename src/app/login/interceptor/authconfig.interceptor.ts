import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthconfigInterceptor implements HttpInterceptor {
  constructor(protected userService: UserService) {}

  // interceptamos las peticiones
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // obtenemos el token
    const authToken = this.userService.getToken();

    let req = request;
    // validamos si el token existe
    if (authToken) {
      // clonamos la peticion con el token agregado en el header de la peticion
      req = request.clone({
        // colocamos le token en el header
        setHeaders: {
          'Auth-key': `${authToken}`,
        },
      });
    }

    // retornamos la peticion
    return next.handle(req);
  }
}
