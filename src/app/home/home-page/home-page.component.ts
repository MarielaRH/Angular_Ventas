import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserService } from '../../login/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  //variables a usar
  isLogged: boolean = false;
  items: MenuItem[] = [];
  itemLogin: MenuItem[] = [];
  itemLogout: MenuItem[] = [];
  activeItem: MenuItem = {};

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    //definimos los items de los menus

    //items del menu principal
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: [''] },
      { label: 'Ventas', icon: 'pi pi-fw pi-dollar', routerLink: ['/ventas'] },
      { label: 'Catálogo', icon: 'pi pi-fw pi-book' },
      { label: 'Entregas', icon: 'pi pi-fw pi-send' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog' },
    ];
    this.activeItem = this.items[0];

    //items de menu usuario
    this.itemLogin = [
      {
        label: 'Log In',
        icon: 'pi pi-key',
        command: () => {
          this.homeLogin();
        },
      },
    ];

    this.itemLogout = [
      {
        label: 'Log Out',
        icon: 'pi pi-sign-out',
        command: () => {
          this.homeLogout();
        },
      },
    ];

    // nos subscribimos al observable
    this.userService.userState.subscribe((data) => {
      this.isLogged = data;
    });
  }

  //Métodos del menu usuario
  homeLogin() {
    this.router.navigate(['/login']);
  }

  homeLogout() {
    this.userService.logout();
  }
}
