import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { UserService } from '../../login/services/user.service';
import { UserLoginComponent } from '../../login/user-login/user-login.component';
import { User } from '../../login/model/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  isLogged: boolean = false;
  items: MenuItem[] = [];
  itemsLogin: MenuItem[] = [];
  itemsLogout: MenuItem[] = [];
  activeItem: MenuItem = {};

  constructor(private router: Router, private user : UserService) { }

  ngOnInit() {
      this.items = [
          {label: 'Home', icon: 'pi pi-fw pi-home',routerLink:['']},
          {label: 'Ventas', icon: 'pi pi-fw pi-dollar', routerLink:['/ventas']},
          {label: 'Catálogo', icon: 'pi pi-fw pi-book'},
          {label: 'Entregas', icon: 'pi pi-fw pi-send'},
          {label: 'Settings', icon: 'pi pi-fw pi-cog'}
      ];
      this.activeItem = this.items[0];

      this.itemsLogin = [{
            label: 'Log In',
            icon: 'pi pi-key',
            command: () => {
              this.homeLogin();
            }
        },
      ];

      this.itemsLogout = [{
          label: 'Log Out',
          icon: 'pi pi-sign-out',
          command: () => {
            this.homeLogout();
          }
        },
      ];

      this.isLogged = this.user.isLogged;
  }

  homeLogin(){
    this.router.navigate(['/login']);
  }

  homeLogout(){
    this.user.logout()
  }

}