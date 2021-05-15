import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLogged: boolean = false;
  endPoint : string = environment.backend;
  httpHeader = {
    headers : new HttpHeaders({'Content-Type':'application/json'})
  }




  // inyectamos el modulo para las peticiones http
  constructor(private httpClient : HttpClient, private router : Router) { }


  login(user: User){
    // mandamos los datos del usuario para que nos devuelva un objeto donde vendrá el token
    this.isLogged = true;
    return this.httpClient.post(`${this.endPoint}/login`,JSON.stringify(user),this.httpHeader);
  }

  getToken(){
    // retornamos el token
    return localStorage.getItem('authKey');
  }

  logout(){
    this.isLogged = false;
    localStorage.removeItem('authKey');
    this.router.navigate(['']);
  }
}

/* {
lsosa@gmail.com
123
} */