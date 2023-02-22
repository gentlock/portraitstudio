import { Directive, HostListener, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[fotoPopup]'
})
export class PopupDirective {
  readonly modalContainer : HTMLDivElement    = this._render.createElement("div");
  readonly content        : HTMLDivElement    = this._render.createElement("div");
  readonly photo          : HTMLImageElement  = this._render.createElement("img");
  readonly refToBody      : HTMLElement       = document.body;

  constructor(
    private _render: Renderer2
  ) { }

  @HostListener('click', ['$event.target'])
  createPopup = (event: EventTarget) => {
    this.photo.src = (event as HTMLImageElement).src;

    this._render.addClass(this.modalContainer, "modal-container");
    this.modalContainer.addEventListener("click", (e)=>{
      this.destroyPopup();
    })

    this._render.appendChild(this.modalContainer, this.content);
    this._render.appendChild(this.content, this.photo);
    this._render.addClass(this.content, "modal");
    this._render.appendChild(this.refToBody, this.modalContainer);

    setTimeout(()=>{
      this._render.addClass(this.content, "modal--pop");
    }, 1)

    // console.log(this.photo.src);
  }

  destroyPopup = () => {
    this._render.removeClass(this.content, "modal--pop");
    this._render.removeChild(this.content, this.photo);
    this._render.removeChild(this.modalContainer, this.content);
    this._render.removeChild(this.refToBody, this.modalContainer);
  }
}
