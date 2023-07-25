import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewproductsRoutingModule } from './viewproducts-routing.module';
import { ViewproductsComponent } from './viewproducts.component';


@NgModule({
  declarations: [
    ViewproductsComponent
  ],
  imports: [
    CommonModule,
    ViewproductsRoutingModule
  ]
})
export class ViewproductsModule { }
