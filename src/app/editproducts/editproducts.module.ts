import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditproductsRoutingModule } from './editproducts-routing.module';
import { EditproductsComponent } from './editproducts.component';
import { IonicModule } from '@ionic/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditproductsComponent
  ],
  imports: [
    CommonModule,
    EditproductsRoutingModule,
    FormsModule,
     IonicModule,
     ReactiveFormsModule 
  ]
})
export class EditproductsModule { }
