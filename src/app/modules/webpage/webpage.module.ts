import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebpageRoutingModule } from './webpage-routing.module';
import {NavbarComponent} from "./components/navbar/navbar.component";
import { FooterComponent } from './components/footer/footer.component';
import { FaqComponent } from './pages/faq/faq.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { ContactComponent} from "./pages/contact/contact.component";
import { AlbumsComponent } from './pages/albums/albums.component';
import { WebpageEntryPointComponent } from "./components/webpage-entry-point/webpage-entry-point.component";

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    FaqComponent,
    AboutMeComponent,
    ContactComponent,
    AlbumsComponent,
    WebpageEntryPointComponent
  ],
  imports: [
    CommonModule,
    WebpageRoutingModule
  ]
})
export class WebpageModule { }
