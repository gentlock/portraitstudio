import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[ngIfAnimation]'
})
export class TabmenuAnimationDirective {
  private value: any;
  private hasView = false;

  constructor(
    private view: ViewContainerRef,
    private tmpl: TemplateRef<any>
  ) { }

  @Input() set ngIfAnimation(val: any) {
    if (!this.hasView) {
      this.view.createEmbeddedView(this.tmpl);
      this.hasView = true;
    } else if (val !== this.value) {
      this.view.clear();
      this.view.createEmbeddedView(this.tmpl);
      this.value = val;
    }
  }

}
