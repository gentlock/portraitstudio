import { Component} from '@angular/core';
import {LoaderService} from "../../../../core/services/loader/loader.service";

@Component({
  selector: 'studio-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  constructor(
    private loaderService: LoaderService
  ) {

  }

  initApp(e: Event) {
    //this.loaderService.hide();
  }
}
