import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditproductsComponent } from './editproducts.component';

const routes: Routes = [{ path: '', component: EditproductsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditproductsRoutingModule { }
