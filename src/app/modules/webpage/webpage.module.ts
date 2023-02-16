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
import { LoaderComponent } from './components/loader/loader.component';
// import {HTTP_INTERCEPTORS} from '@angular/common/http';
// import {LoaderInterceptor} from "../../core/interceptors/loader.interceptor";
import { LoaderService } from "../../core/services/loader/loader.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MyservicesComponent } from './pages/myservices/myservices.component';

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
    LoaderComponent,
    MyservicesComponent,
  ],
    imports: [
        CommonModule,
        WebpageRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [
  ]
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: LoaderInterceptor,
  //     multi: true
  //   },
  // ],
})
export class WebpageModule { }
