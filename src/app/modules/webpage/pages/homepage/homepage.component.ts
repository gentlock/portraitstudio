import {AfterViewInit, Component} from '@angular/core';
import { NavbarService } from "../../../../core/services/navbar/navbar.service";
// import {LoaderService} from "../../../../core/myservices/loader/loader.service";

@Component({
  selector: 'studio-myservices',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {
  constructor(
    // private loaderService: LoaderService
    private _navbarService: NavbarService
  ) {}

  ngAfterViewInit() {

  }

  initApp(e: Event) {

  }
    //this.loaderService.hide();


    // this.loaderService.show();
}
