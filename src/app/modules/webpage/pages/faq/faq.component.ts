import {
  AfterViewInit,
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

// import {LoaderService} from "../../../../core/myservices/loader/loader.service";
//
@Component({
  selector: 'studio-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  animations: [
    trigger('myAnimation', [
      state('void', style({opacity: 0 })),
      state('*', style({opacity: 1 })),
      transition('void => *', [animate('0.8s')]),
      transition('* => void', [animate('0.8s')])
    ])
  ],
})
export class FaqComponent implements  AfterViewInit{
  @ViewChild('navTabs') navTabs!: ElementRef<HTMLElement>;
  // @ViewChild('viewcontainer', {read: ViewContainerRef}) viewContainer!: ViewContainerRef;
  @ViewChild('booking', {read: TemplateRef}) booking!: TemplateRef<any>;
  @ViewChild('photoshots', {read: TemplateRef}) photoshots!: TemplateRef<any>;
  @ViewChild('follow_up', {read: TemplateRef}) follow_up!: TemplateRef<any>;
  @ViewChild('changes', {read: TemplateRef}) changes!: TemplateRef<any>;

  object!: TemplateRef<any>;

  viewsReady = false;

  resetTabs() {
    this.navTabs.nativeElement.querySelectorAll('li').forEach((item) =>{
      item.classList.remove('active');
    })
  }

  ngAfterViewInit() {
    this.viewsReady = true;
    this.object = this.booking;

    this.navTabs.nativeElement.querySelectorAll('a').forEach((item) => {

      item.addEventListener('click',(e: Event) => {
        e.preventDefault();
        this.resetTabs();
        let template = (e.target as HTMLAnchorElement ).closest('li.tab')!;
        template.classList.add('active');
        let tplName = template.getAttribute('data-anchor')!;

        if( tplName === 'photoshots') {
          this.object = this.photoshots;
        } else if (tplName === 'follow_up') {
          this.object = this.follow_up;
        } else if (tplName === 'changes') {
          this.object = this.changes;
        } else {
          this.object = this.booking;
        }
      })
    });
 }
}
