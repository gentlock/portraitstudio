import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminEntryPointComponent } from './pages/admin-entry-point/admin-entry-point.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AlbumsMgrComponent } from './pages/albums-mgr/albums-mgr.component';
import { MyservicesMgrComponent } from './pages/myservices-mgr/myservices-mgr.component';
import { CarouselMgrComponent } from './pages/carousel-mgr/carousel-mgr.component';
import { SettingsComponent } from './pages/settings/settings.component';

import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from "@angular/material/select";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { FilesUploadComponent } from './components/files-upload/files-upload.component';

@NgModule({
  declarations: [
    NavbarComponent,
    AdminEntryPointComponent,
    AlbumsMgrComponent,
    MyservicesMgrComponent,
    CarouselMgrComponent,
    SettingsComponent,
    FilesUploadComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressBarModule,
    MatTableModule,
    MatTabsModule
  ],
  exports: [

  ]
})
export class AdminModule { }
