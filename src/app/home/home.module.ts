import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import {TabMenuModule} from 'primeng/tabmenu';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {MenuModule} from 'primeng/menu';




@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    TabMenuModule,
    ToolbarModule,
    ButtonModule,
    MenuModule
  ]
})
export class HomeModule { }
