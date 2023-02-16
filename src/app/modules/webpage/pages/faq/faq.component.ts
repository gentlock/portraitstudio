import {
  AfterViewInit,
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

// import {LoaderService} from "../../../../core/services/loader/loader.service";
//
@Component({
  selector: 'studio-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  animations: [
    trigger('div', [
      state('void', style({ transform: 'scale(0)' })),
      state('*', style({transform: 'scale(1)' })),
      transition('void => *', [animate('0.2s 0.2s ease-in')]),
      transition('* => void', [animate('0.2s ease-in')])
    ])
  ],
})
export class FaqComponent implements  AfterViewInit{
  @ViewChild('navTabs') navTabs!: ElementRef<HTMLElement>;
  @ViewChild('viewcontainer', {read: ViewContainerRef}) viewContainer!: ViewContainerRef;
  @ViewChild('booking', {read: TemplateRef}) booking!: TemplateRef<any>;
  @ViewChild('photoshots', {read: TemplateRef}) photoshots!: TemplateRef<any>;
  @ViewChild('follow_up', {read: TemplateRef}) follow_up!: TemplateRef<any>;
  @ViewChild('changes', {read: TemplateRef}) changes!: TemplateRef<any>;

  resetTabs() {
    this.navTabs.nativeElement.querySelectorAll('li').forEach((item) =>{
      item.classList.remove('active');
    })
  }

  ngAfterViewInit() {
    // console.log(this.viewContainer.);
    this.navTabs.nativeElement.querySelectorAll('a').forEach((item) => {

      item.addEventListener('click',(e: Event) => {
        e.preventDefault();
        this.resetTabs();
        let template = (e.target as HTMLAnchorElement ).closest('li.tab')!;
        template.classList.add('active');
        let templateName = template.getAttribute('data-anchor');

        console.log(templateName);
        this.viewContainer.clear();

        if( templateName === 'photoshots' ) {
          this.viewContainer.createEmbeddedView(this.photoshots);
        } else if ( templateName === 'follow_up' ) {
          this.viewContainer.createEmbeddedView(this.follow_up);

        } else if ( templateName === 'changes' ) {
          this.viewContainer.createEmbeddedView(this.changes);
        } else {
          this.viewContainer.createEmbeddedView(this.booking);
        }

      })
    });
 }
}
