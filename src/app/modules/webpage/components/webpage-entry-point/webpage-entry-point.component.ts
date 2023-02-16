import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { fadeAnimation } from "../../../../core/helpers/route_animation";
import { NavbarService } from "../../../../core/services/navbar/navbar.service";
// import {RouterOutlet} from "@angular/router";
// import {LoaderService} from "../../../../core/services/loader/loader.service";

@Component({
  selector: 'studio-webpage-entry-point',
  templateUrl: './webpage-entry-point.component.html',
  styleUrls: ['./webpage-entry-point.component.scss'],
  animations: [fadeAnimation]
})
export class WebpageEntryPointComponent implements  AfterViewInit {
  @ViewChild('article') article!: ElementRef<HTMLElement>;

  constructor(
    private _navbarService: NavbarService
    // private loaderService: LoaderService
  ) {}

  ngAfterViewInit() {
    const sectionOne  = document.querySelector('.pixelToWatch')!;

    const sectionOneOptions = {
      rootMargin: "-10px 0px 0px 0px"
    }

    const sectionOneObserver = new IntersectionObserver(
      (entries, sectionObserver) => {
        entries.forEach((entry=> {
          if(!entry.isIntersecting) {
            this._navbarService.expand();
            this.article.nativeElement.classList.remove('adjust-thickness');
          } else {
            this._navbarService.shrink();
            this.article.nativeElement.classList.add('adjust-thickness');
          }
        }))
      }, sectionOneOptions);

    sectionOneObserver.observe(sectionOne);
  }
}

