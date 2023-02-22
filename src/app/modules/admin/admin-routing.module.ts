import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyservicesMgrComponent } from "./pages/myservices-mgr/myservices-mgr.component";
import { AlbumsMgrComponent} from "./pages/albums-mgr/albums-mgr.component";
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/admin/albums', pathMatch: 'full'
  },
  {
    path: "albums", component: AlbumsMgrComponent
  },
  {
    path: "myservices", component: MyservicesMgrComponent
  },
  {
    path: "settings", component: SettingsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
