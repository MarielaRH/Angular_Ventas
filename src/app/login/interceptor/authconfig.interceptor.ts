import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthconfigInterceptor implements HttpInterceptor {

  // importamos nuestro servicio de usuarios
  constructor(protected services : UserService) {}

  // interceptamos la peticion
  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    // obtenemos el token
    const authToken = this.services.getToken();

    let req = request;
    // validamos si el token existe
    if(authToken){

      // clonamos la peticion con el token agregado en el header de la peticion
       req = request.clone({
        // colocamos le token en el header
        setHeaders: {
          'Auth-key': `${authToken}`
        }
      });
      console.log(req);
    }

    // retornamos la peticion
    return next.handle(req);

  }
}
