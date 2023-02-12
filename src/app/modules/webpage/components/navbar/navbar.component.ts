import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {highlightNavTab} from "../../../../core/helpers/utils";
import {Router} from "@angular/router";

@Component({
  selector: 'webpage-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {
  constructor(
    private _route: Router,
    private _render: Renderer2
  ) {
  }
  @ViewChild('navbar') navbar!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    this.initApp();
  }

  initApp() {
    const navTabs = this.navbar.nativeElement.querySelectorAll("div.navbar-tabgroup--menu > a.tab");
    highlightNavTab(this._route, this._render, navTabs, this.navbar.nativeElement);
  }
}
