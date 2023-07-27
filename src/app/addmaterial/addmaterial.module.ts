import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddmaterialRoutingModule } from './addmaterial-routing.module';
import { AddmaterialComponent } from './addmaterial.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    AddmaterialComponent
  ],
  imports: [
    CommonModule,
    AddmaterialRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class AddmaterialModule { }
