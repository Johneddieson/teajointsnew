import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewmaterialsComponent } from './viewmaterials.component';

const routes: Routes = [{ path: '', component: ViewmaterialsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewmaterialsRoutingModule { }
