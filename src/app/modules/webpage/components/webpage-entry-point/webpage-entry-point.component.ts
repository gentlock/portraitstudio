import {AfterViewInit, Component} from '@angular/core';
import { fadeAnimation } from "../../../../core/helpers/route_animation";
// import {RouterOutlet} from "@angular/router";
import {LoaderService} from "../../../../core/services/loader/loader.service";

@Component({
  selector: 'studio-webpage-entry-point',
  templateUrl: './webpage-entry-point.component.html',
  styleUrls: ['./webpage-entry-point.component.scss'],
  animations: [fadeAnimation]
})
export class WebpageEntryPointComponent implements  AfterViewInit {
  constructor(
    private loaderService: LoaderService
  ) {}

  ngAfterViewInit() {
    //this.loaderService.show();
  }
  // prepareRoute(outlet: RouterOutlet) {
  //
  //   if(outlet.isActivated) {
  //
  //   }
  //   return outlet &&
  //     outlet.activatedRouteData &&
  //     outlet.activatedRouteData['animationState'];
  // }
}
