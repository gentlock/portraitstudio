import {
  AfterViewInit,
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[ngIfAnimation]'
})
export class TabmenuAnimationDirective implements AfterViewInit {
  private value: any;
  private hasView = false;

  constructor(
    private view: ViewContainerRef,
  ) { }

  ngAfterViewInit() {

  }

  @Input() set ngIfAnimation(val: TemplateRef<any>) {

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
