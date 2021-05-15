import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  user: User = {
    username : "",
    password : "",
  }

  // inyectamos nuestro servicio
  constructor(protected service: UserService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  loginUser(){
    if(this.user.username ==="" || this.user.password ===""){
      console.log('ERROR');
      this.messageService.add({severity:'info', summary: 'Acceso no permitido', detail: 'Ambos campos deben estar llenos', icon: 'pi-file'});
    }else{

      // Del response sacamos el token
      this.service.login(this.user).subscribe((response:any) =>{
        // guardamos en el local storage nuestro token
        console.log({response});
        localStorage.setItem('authKey',response.authKey)
        // cambiam
        this.router.navigate(['ventas']);
      })
    }
  }

}
