import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopwithcategoryRoutingModule } from './shopwithcategory-routing.module';
import { ShopwithcategoryComponent } from './shopwithcategory.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ShopwithcategoryComponent
  ],
  imports: [
    CommonModule,
    ShopwithcategoryRoutingModule,
    NgbPaginationModule
  ]
})
export class ShopwithcategoryModule { }
