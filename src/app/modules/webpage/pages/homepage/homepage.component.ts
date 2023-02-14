import {AfterViewInit, Component} from '@angular/core';
import { LoaderService } from "../../../../core/services/loader/loader.service";

@Component({
  selector: 'studio-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit{
  initApp(e: Event) {
    // this.loaderService.hide();
    // console.log("zakonczono ladowanie");
  }
  ngAfterViewInit() {
  }
}
