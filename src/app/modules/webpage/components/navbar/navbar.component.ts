import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {highlightNavTab} from "../../../../core/helpers/utils";
import { NavbarService } from "../../../../core/services/navbar/navbar.service";
import {Router} from "@angular/router";
import { Subject } from 'rxjs';

@Component({
  selector: 'webpage-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {
  constructor(
    private _route: Router,
    private _render: Renderer2,
    private _navbarService: NavbarService
  ) {
  }
  @ViewChild('navbar') navbar!: ElementRef<HTMLElement>;
  action: Subject<boolean> = this._navbarService.action;

  ngAfterViewInit() {
    const navTabs = this.navbar.nativeElement.querySelectorAll("div.navbar-tabgroup--menu > a.tab");
    highlightNavTab(this._route, this._render, navTabs, this.navbar.nativeElement);

    this.action.subscribe(
      {
        next: (value)=> {
          // console.log(value);

          if(value) {
            this.navbar.nativeElement.classList.add('shrink');
          } else {
            this.navbar.nativeElement.classList.remove('shrink');
          }
        }
      }
    )
  }
}
