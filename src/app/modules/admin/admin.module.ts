import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminEntryPointComponent } from './components/admin-entry-point/admin-entry-point.component';


@NgModule({
  declarations: [
    NavbarComponent,
    AdminEntryPointComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
