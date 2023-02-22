import {AfterViewInit, Component} from '@angular/core';
@Component({
  selector: 'studio-admin-entry-point',
  templateUrl: './admin-entry-point.component.html',
  styleUrls: ['./admin-entry-point.component.scss']
})
export class AdminEntryPointComponent implements AfterViewInit{
  ngAfterViewInit() {
    let navbar = document.querySelector('.navbar')!
    let navbarWidth = navbar.clientWidth;
    let topbarHeight = document.querySelector('.topbar')!.clientHeight;
    let main = document.querySelector('main')!;

    (navbar as HTMLDivElement).style.height = `${document.body.clientHeight - topbarHeight}px`;

    main.style.marginLeft = `${navbarWidth}px`;
    main.style.marginTop  = `${topbarHeight}px`;

    const  callback = (entries: ResizeObserverEntry[]) => {
      for (let  entry of entries) {
        (navbar as HTMLDivElement).style.height = `${entry.contentRect.height - topbarHeight}px`;
      }
    };

     new ResizeObserver(callback).observe(document.body);
  }
}
