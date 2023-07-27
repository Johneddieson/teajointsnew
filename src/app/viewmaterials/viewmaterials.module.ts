import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewmaterialsRoutingModule } from './viewmaterials-routing.module';
import { ViewmaterialsComponent } from './viewmaterials.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    ViewmaterialsComponent
  ],
  imports: [
    CommonModule,
    ViewmaterialsRoutingModule,
    FormsModule,
     IonicModule,
     ReactiveFormsModule 
  ]
})
export class ViewmaterialsModule { }
