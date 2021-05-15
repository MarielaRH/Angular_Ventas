import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasPageComponent } from './ventas-page/ventas-page.component';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {KeyFilterModule} from 'primeng/keyfilter';
import {MenuModule} from 'primeng/menu';


@NgModule({
  declarations: [
    VentasPageComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    TableModule,
    HttpClientModule,
    ToolbarModule,
    ButtonModule,
    BrowserAnimationsModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    ToastModule,
    ConfirmPopupModule,
    KeyFilterModule,
    MenuModule
  ],
  providers:[
    MessageService, ConfirmationService
  ]
})
export class VentasModule { }
