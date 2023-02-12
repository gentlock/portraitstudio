import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {AboutMeComponent} from "./pages/about-me/about-me.component";
import {FaqComponent} from "./pages/faq/faq.component";
import {AlbumsComponent} from "./pages/albums/albums.component";
import {ContactComponent} from "./pages/contact/contact.component";

const routes: Routes = [
  {
    path: "", component: HomepageComponent,
  },
  {
    path: "aboutme", component: AboutMeComponent,
  },
  {
    path: "faq", component: FaqComponent
  },
  {
    path: "albums", component: AlbumsComponent
  },
  {
    path: "contact", component: ContactComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebpageRoutingModule { }
