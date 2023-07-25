import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminhomeRoutingModule } from './adminhome-routing.module';
import { AdminhomeComponent } from './adminhome.component';


@NgModule({
  declarations: [
    AdminhomeComponent
  ],
  imports: [
    CommonModule,
    AdminhomeRoutingModule
  ]
})
export class AdminhomeModule { }
