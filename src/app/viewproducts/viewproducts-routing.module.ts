import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewproductsComponent } from './viewproducts.component';

const routes: Routes = [{ path: '', component: ViewproductsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewproductsRoutingModule { }
