import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasPageComponent } from './ventas-page/ventas-page.component';

const routes: Routes = [
  {path: 'ventas', component: VentasPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
