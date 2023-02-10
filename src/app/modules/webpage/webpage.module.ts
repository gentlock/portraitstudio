import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebpageRoutingModule } from './webpage-routing.module';
import {NavbarComponent} from "./components/navbar/navbar.component";
import { FooterComponent } from './components/footer/footer.component';
import { FaqComponent } from './pages/faq/faq.component';
import { PrintsComponent } from './pages/prints/prints.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { ContactComponent} from "./pages/contact/contact.component";
import { StudioComponent} from "./pages/studio/studio.component";

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    FaqComponent,
    PrintsComponent,
    AboutMeComponent,
    ContactComponent,
    StudioComponent
  ],
  imports: [
    CommonModule,
    WebpageRoutingModule
  ]
})
export class WebpageModule { }
