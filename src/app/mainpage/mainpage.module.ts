import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainpageRoutingModule } from './mainpage-routing.module';
import { MainpageComponent } from './mainpage.component';


@NgModule({
  declarations: [
    MainpageComponent
  ],
  imports: [
    CommonModule,
    MainpageRoutingModule
  ]
})
export class MainpageModule { }
