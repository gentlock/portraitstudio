import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabmenuAnimationDirective } from './directives/tabmenu-animation.directive';
// import { DataLoadersService} from "./services/utlis/data-loaders.service";
// import { ErrorsHandlerService } from "./myservices/errors/errors-handler.service";
// import { MailHandlerService } from "./myservices/mailing/mail-handler.service";
// import { SessionHandlerService } from "./myservices/session/session-handler.service";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderService } from "./services/loader/loader.service";
import { LoaderComponent } from "./components/loader/loader.component";
import { DatePipe } from '@angular/common';
import { PopupDirective } from "./directives/popup.directive";

/*imports:      [ CommonModule ],
  declarations: [ CustomerComponent, NewItemDirective, OrdersPipe ],
  exports:      [ CustomerComponent, NewItemDirective, OrdersPipe,
  CommonModule, FormsModule ]*/

@NgModule({
  declarations: [
    LoaderComponent,
    TabmenuAnimationDirective,
    PopupDirective
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    // HttpClientModule
  ],
  exports: [
    TabmenuAnimationDirective,
    LoaderComponent,
    PopupDirective
  ],
  providers: [
    DatePipe,
    PopupDirective
  ]
})
export class SharedModule {
  constructor(
    // public loader: DataLoadersService,
    // public loaderService: LoaderService
  ) {}
}
