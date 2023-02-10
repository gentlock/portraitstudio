import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminEntryPointComponent } from './components/admin-entry-point/admin-entry-point.component';
import { BookingsComponent } from "./pages/bookings/bookings.component";
import { CalendarManagerComponent } from "./pages/calendar-manager/calendar-manager.component";
import { HomepageComponent} from "./pages/homepage/homepage.component";
import { PortfolioComponent} from "./pages/portfolio/portfolio.component";
import { OrdersComponent } from "./pages/shop/orders/orders.component";
import { ProductsComponent } from "./pages/shop/products/products.component";

@NgModule({
  declarations: [
    NavbarComponent,
    AdminEntryPointComponent,
    BookingsComponent,
    CalendarManagerComponent,
    HomepageComponent,
    PortfolioComponent,
    OrdersComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
