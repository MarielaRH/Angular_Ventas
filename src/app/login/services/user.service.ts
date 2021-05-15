import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //variables a usar
  userState: Subject<boolean> = new BehaviorSubject<boolean>(false);
  endPoint: string = environment.backend;
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient, private router: Router) {}

  //método para hacer login
  login(user: User) {
    // mandamos los datos del usuario al endPoint
    return this.httpClient.post(
      `${this.endPoint}/login`,
      JSON.stringify(user),
      this.httpHeader
    );
  }

  //Método para obtener el token del local storage
  getToken() {
    return localStorage.getItem('authKey');
  }

  //Método para hacer logout
  logout() {
    localStorage.removeItem('authKey');
    this.userState.next(false);
    this.router.navigate(['']);
  }
}
