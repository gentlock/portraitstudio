import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { DataLoadersService } from "./services/utlis/data-loaders.service";
// import { ErrorsHandlerService } from "./services/errors/errors-handler.service";
// import { MailHandlerService } from "./services/mailing/mail-handler.service";
// import { SessionHandlerService } from "./services/session/session-handler.service";
// import { LoaderService } from "./services/loader/loader.service";
// import { LoaderInterceptor } from "./interceptors/loader.interceptor";

/*imports:      [ CommonModule ],
  declarations: [ CustomerComponent, NewItemDirective, OrdersPipe ],
  exports:      [ CustomerComponent, NewItemDirective, OrdersPipe,
  CommonModule, FormsModule ]*/

@NgModule({
  declarations: [
    // DataLoadersService,
    // ErrorsHandlerService
  ],
  imports: [
    CommonModule,
  ],
  exports: [
  ]
})
export class SharedModule {
  constructor(
    // public loader: DataLoadersService,
    // public loaderService: LoaderService
  ) {}
}
