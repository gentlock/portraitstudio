import {AfterViewInit, Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import {DataLoadersService} from "../../../../core/services/utlis/data-loaders.service";
import { imgPreloader } from "../../../../core/helpers/utils";
import {LoaderService} from "../../../../core/services/loader/loader.service";

@Component({
  selector: 'studio-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class CarouselComponent implements AfterViewInit {
  @Output() loadingComplete: EventEmitter<any> = new EventEmitter();
  private photosArray = this.dataLoader.conf.carousel;
  private imagePreloader = imgPreloader;

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
      innerHTML: "<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z\"/></svg>",
      onclick: () => prev(),
    });

    const elNext = this.elNew("button", {
      type: "button",
      className: "carousel-next",
      innerHTML: "<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z\" /></svg>",
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
    // elNavigation.append(...elsBtns);
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
    private loaderService: LoaderService
  ) {
    // Object.values(dataLoader.conf.carousel).forEach((item)=> {
  }



  async ngAfterViewInit() {
    this.loaderService.show();

    await this.imagePreloader.preloadAll(this.photosArray.item.map(el=>el.url))
      .then(()=> {
        this.photosArray.item.forEach((item) => {
          const elImg = this.elNew("img", {src: item.url});
          const elLi = this.elNew("li", {className: "carousel-slide"});
          const elDiv = this.elNew("div", {className: "desc", innerHTML: item.desc});
          elLi.append(elImg);
          elLi.append(elDiv);
          document.querySelector('.carousel-slider')!.append(elLi);
        })

        this.loaderService.hide();

        // setTimeout(
        //   ()=>{
        //     this.loaderService.hide();
        //   }, 5000
        // )
      })
    ;
    // this.imagePreloader.preloadAll(this.photosArray.item.map(item=>item.url))
    //   .then((imgUrl)=> {
    //     imgUrl.forEach((item) => {
    //       const elImg = this.elNew("img", {src: item});
    //       const elLi = this.elNew("li", {className: "carousel-slide"});

    // const elDiv = this.elNew("div", {innerHTML: ""});

    // elLi.append(elelDiv);
    //       elLi.append(elImg);
    //       document.querySelector('.carousel-slider')!.append(elLi);
    //     });
    //   })
    //   .then(() => {
    //     // uruchom karuzele
    //     this.els(".carousel").forEach(this.carousel);
    // });

    this.els(".carousel").forEach(this.carousel);
  }
}
