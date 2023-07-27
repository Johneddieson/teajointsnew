import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddmaterialComponent } from './addmaterial.component';

const routes: Routes = [{ path: '', component: AddmaterialComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddmaterialRoutingModule { }
