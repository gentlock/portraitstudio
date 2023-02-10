import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminEntryPointComponent } from './modules/admin/components/admin-entry-point/admin-entry-point.component';
import { WebpageEntryPointComponent } from './modules/webpage/components/webpage-entry-point/webpage-entry-point.component';
import { HomepageComponent } from './modules/webpage/pages/homepage/homepage.component';
import { PortfolioComponent } from './modules/webpage/pages/portfolio/portfolio.component';
import { ContactComponent } from './modules/webpage/pages/contact/contact.component';
import { StudioComponent } from './modules/webpage/pages/studio/studio.component';
import { BookingsComponent } from './modules/admin/pages/bookings/bookings.component';
import { CalendarManagerComponent } from './modules/admin/pages/calendar-manager/calendar-manager.component';
import { ProductsComponent } from './modules/admin/pages/shop/products/products.component';
import { OrdersComponent } from './modules/admin/pages/shop/orders/orders.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminEntryPointComponent,
    WebpageEntryPointComponent,
    HomepageComponent,
    PortfolioComponent,
    ContactComponent,
    StudioComponent,
    BookingsComponent,
    CalendarManagerComponent,
    ProductsComponent,
    OrdersComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
