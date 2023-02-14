import {AfterViewInit, Component, ViewEncapsulation} from '@angular/core';
import {DataLoadersService} from "../../../../core/services/utlis/data-loaders.service";

@Component({
  selector: 'studio-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class CarouselComponent implements AfterViewInit {
  // DOM utility functions:
  private el = (sel: string, par: Element) => (par || document).querySelector(sel);
  private els = (sel: string, par?: Element | null) => (par || document).querySelectorAll(sel);
  private elNew = (tag: string, prop: Object) => Object.assign(document.createElement(tag), prop);

  // Helper functions:
  private mod = (n: number, m: number) => (n % m + m) % m;

  private carousel = (elCarousel: any) => {
    const animation = 500;
    const pause = 5000;

    const elCarouselSlider = this.el(".carousel-slider", elCarousel);
    const elsSlides = this.els(".carousel-slide", elCarouselSlider);
    const elsBtns: HTMLElement[] = [];

    let itv: number // Autoslide interval
    let tot = elsSlides.length; // Total slides
    let c = 0;

    if (tot < 2) return; // Not enough slides. Do nothing.

    // Methods:
    const anim = (ms = animation) => {
      const cMod = this.mod(c, tot);

      // Move slider
      (elCarouselSlider as HTMLElement).style.transitionDuration = `${ms}ms`;
      (elCarouselSlider as HTMLElement).style.transform = `translateX(${(-c - 1) * 100}%)`;

      // Handle active classes (slide and bullet)
      elsSlides.forEach((elSlide, i) => elSlide.classList.toggle("is-active", cMod === i));
      elsBtns.forEach((elBtn: any, i: number) => elBtn.classList.toggle("is-active", cMod === i));
    };

    const prev = () => {
      if (c <= -1) return; // prevent blanks on fast prev-click
      c -= 1;
      anim();
    };

    const next = () => {
      if (c >= tot) return; // prevent blanks on fast next-click
      c += 1;
      anim();
    };

    const goto = (index: number) => {
      c = index;
      anim();
    };

    const play = () => {
      itv = window.setInterval(next, pause + animation);
    };

    const stop = () => {
      window.clearInterval(itv);
    };

    // Buttons:

    const elPrev = this.elNew("button", {
      type: "button",
      className: "carousel-prev",
      innerHTML: "<span>Prev</span>",
      onclick: () => prev(),
    });

    const elNext = this.elNew("button", {
      type: "button",
      className: "carousel-next",
      innerHTML: "<span>Next</span>",
      onclick: () => next(),
    });

    // Navigation:
    const elNavigation = this.elNew("div", {
      className: "carousel-navigation",
    });

    // Navigation bullets:
    for (let i = 0; i < tot; i++) {
      const elBtn = this.elNew("button", {
        type: "button",
        className: "carousel-bullet",
        onclick: () => goto(i)
      });
      elsBtns.push(elBtn);
    }

    // Infinite slide effect:
    (elCarouselSlider as HTMLElement).addEventListener("transitionend", () => {
      if (c <= -1) c = tot - 1;
      if (c >= tot) c = 0;
      anim(0); // quickly switch to "c" slide (with animation duration 0)
    });

    // Pause on pointer enter:
    elCarousel.addEventListener("pointerenter", () => stop());
    elCarousel.addEventListener("pointerleave", () => play());

    // Init:

    // Insert UI elements:
    elNavigation.append(...elsBtns);
    elCarousel.append(elPrev, elNext, elNavigation);

    // Clone first and last slides (for "infinite" slider effect)
    (elCarouselSlider as HTMLElement).prepend(elsSlides[tot - 1].cloneNode(true));
    (elCarouselSlider as HTMLElement).append(elsSlides[0].cloneNode(true));

    // Initial slide
    anim();
    // Start autoplay
    play();
  }


  constructor(
    private dataLoader: DataLoadersService,
  ) {
    // Object.values(dataLoader.conf.carousel).forEach((item)=> {
  }

  preload = (src: string) => new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(src);
    img.onerror = () => reject(src);
    img.src = src;
  });
  preloadAll = (srcs: string[]) => Promise.all(srcs.map(this.preload))

  async prealoadAllPhotos() {
    let carousel  = this.dataLoader.conf.carousel;
    let slider    = document.querySelector('.carousel-slider')!;

    await this.preloadAll(carousel.item.map(item=>item.name))
      .then((value) => {

        // dodaj zdjecia do karuzeli
        value.forEach(item=> {
          const elLi = this.elNew("li", {className: "carousel-slide"});
          const elImg = this.elNew("img", {src: item as string});

          elLi.append(elImg);
          slider.append(elLi);
        });

        // uruchom karuzele
        this.els(".carousel").forEach(this.carousel);

      })
      .catch((err) => {
        console.error(err);
      });
  }
  ngAfterViewInit() {
    this.prealoadAllPhotos().then(item=>{
      // document.querySelector('#bars')!.classList.add('js-hidden');
      // document.querySelector('.carousel')!.classList.remove('js_not-visible');
    });

  }
}
