import { Component } from '@angular/core';

@Component({
  selector: 'webpage-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  backtotop(e: Event) {
    e.preventDefault();

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
