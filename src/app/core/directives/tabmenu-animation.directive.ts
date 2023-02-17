import {
  Directive,
  Input, OnChanges, SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[ngIfAnimation]'
})
export class TabmenuAnimationDirective implements OnChanges {
  private value: any;
  private hasView = false;

  constructor(
    private view: ViewContainerRef,
  ) { }
  @Input('viewsReadyTrigger') viewsReady: boolean = false;
  @Input('ngIfAnimation') object!: TemplateRef<any>;

  // @Input() set ngIfAnimation(val: TemplateRef<any>) {
  //   if(this.viewsReady) {
  //     this.switchTemplates(val);
  //   }
  // }
  ngOnChanges() {
    if(this.viewsReady) {
      this.switchTemplates(this.object)
    }
  }

  switchTemplates(val: TemplateRef<any>) {
    if (!this.hasView) {
      this.view.createEmbeddedView(val);
      this.hasView = true;
    } else if (val !== this.value) {
      this.view.clear();
      this.view.createEmbeddedView(val);
      this.value = val;
    }
  }



}
