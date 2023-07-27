import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddproductRoutingModule } from './addproduct-routing.module';
import { AddproductComponent } from './addproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    AddproductComponent
  ],
  imports: [
    CommonModule,
    AddproductRoutingModule,
    FormsModule,
     IonicModule,
     ReactiveFormsModule
  ]
})
export class AddproductModule { }
