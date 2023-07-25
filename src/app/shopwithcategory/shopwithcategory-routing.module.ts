import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopwithcategoryComponent } from './shopwithcategory.component';

const routes: Routes = [{ path: '', component: ShopwithcategoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopwithcategoryRoutingModule { }
