import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminEntryPointComponent } from './components/admin-entry-point/admin-entry-point.component';
import { HomepageComponent} from "./pages/homepage/homepage.component";
import { AlbumsComponent } from './pages/albums/albums.component';

@NgModule({
  declarations: [
    NavbarComponent,
    AdminEntryPointComponent,
    HomepageComponent,
    AlbumsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
