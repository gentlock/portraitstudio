import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataLoadersService } from "./utlis/data-loaders.service";
import { ErrorsHandlerService } from "./errors/errors-handler.service";
import { MailHandlerService } from "./mailing/mail-handler.service";
import { SessionHandlerService } from "./session/session-handler.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ]
})
export class SharedModule {
  constructor(
    public loader: DataLoadersService
  ) {}
}
