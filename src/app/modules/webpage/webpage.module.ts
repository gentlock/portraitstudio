import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebpageRoutingModule } from './webpage-routing.module';
import {NavbarComponent} from "./components/navbar/navbar.component";


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    WebpageRoutingModule
  ]
})
export class WebpageModule { }
