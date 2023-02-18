import {AfterViewInit, Component} from '@angular/core';
@Component({
  selector: 'studio-admin-entry-point',
  templateUrl: './admin-entry-point.component.html',
  styleUrls: ['./admin-entry-point.component.scss']
})
export class AdminEntryPointComponent implements AfterViewInit{
  ngAfterViewInit() {
    let margin = document.querySelector('.navbar')!.clientWidth;
    document.querySelector('main')!.style.marginLeft = `${margin}px`;
  }
}
