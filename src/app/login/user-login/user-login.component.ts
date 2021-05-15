import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  //Variables a usar
  user: User = {
    username: '',
    password: '',
  };

  // inyectamos nuestros servicio
  constructor(
    protected userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  //Método para hacer login
  loginUser() {
    if (this.user.username === '' || this.user.password === '') {
      console.log('ERROR');
      this.messageService.add({
        severity: 'info',
        summary: 'Acceso no permitido',
        detail: 'Ambos campos deben estar llenos',
        icon: 'pi-file',
      });
    } else {
      //mandamos los datos del usuario al metodo login del UserService
      this.userService.login(this.user).subscribe((response: any) => {
        // guardamos en el local storage nuestro token
        localStorage.setItem('authKey', response.authKey);

        //cambiamos le valor
        this.userService.userState.next(true);

        // cambiamos a la ruta home
        this.router.navigate(['']);
      });
    }
  }
}
