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
import { CarouselComponent } from './components/carousel/carousel.component';
import { HomepageComponent} from "./pages/homepage/homepage.component";
import { SharedModule } from "../../core/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MyservicesComponent } from './pages/myservices/myservices.component';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    FaqComponent,
    AboutMeComponent,
    ContactComponent,
    AlbumsComponent,
    WebpageEntryPointComponent,
    CarouselComponent,
    HomepageComponent,
    MyservicesComponent,
  ],
    imports: [
        CommonModule,
        WebpageRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule
    ],
})
export class WebpageModule { }
