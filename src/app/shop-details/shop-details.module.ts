import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopDetailsRoutingModule } from './shop-details-routing.module';
import { ShopDetailsComponent } from './shop-details.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ShopDetailsComponent
  ],
  imports: [
    CommonModule,
    ShopDetailsRoutingModule,
    FormsModule
  ]
})
export class ShopDetailsModule { }
