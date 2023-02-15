import {v4 as uuidv4} from 'uuid';
import * as moment from "moment";
import {NavigationEnd, Router} from '@angular/router';
import { Renderer2 } from '@angular/core';
import {filter} from "rxjs";

export const imgPreloader = {
  _preload: (src: string) => new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(src);
    img.onerror = () => reject(src);
    img.src = src;
  }),
  preloadAll: (srcs: string[]) => Promise.all(srcs.map(imgPreloader._preload)),
}

// async prealoadAllPhotos() {
//   let carousel  = this.dataLoader.conf.carousel;
//   let slider    = document.querySelector('.carousel-slider')!;
//
//   await this.preloadAll(carousel.item.map(item=>item.name))
//     .then((value) => {
//
//       // dodaj zdjecia do karuzeli
//       value.forEach(item=> {
//         const elLi = this.elNew("li", {className: "carousel-slide"});
//         const elImg = this.elNew("img", {src: item as string});
//
//         elLi.append(elImg);
//         slider.append(elLi);
//       });
//
//       // uruchom karuzele
//       this.els(".carousel").forEach(this.carousel);
//
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }


export function elapsedTime(date: Date) {
  moment.locale("pl");
  return moment(moment(date).format('X'), 'X').subtract('minutes').fromNow();
}

export function readScreenBreakPoints(refHtmlBody: HTMLElement):string {
  return window
    .getComputedStyle(refHtmlBody, ':after')
    .getPropertyValue('content');
}

export function generateUuid(): string {
  return uuidv4();
}

export const myPasswordGenerator = {
  _pattern: new RegExp(/[a-zA-Z0-9_\-\+\.]/),

  _getRandomByte: () => {
    let result = new Uint8Array(1);
    window.crypto.getRandomValues(result);
    return result[0];
  },

  generate: (length: number) => {
    return Array.apply(null, new Array(length)).map(() => {
      let result;
      while (true) {
        result = String.fromCharCode(myPasswordGenerator._getRandomByte());
        if (myPasswordGenerator._pattern.test(result)) {
          return result;
        }
      }
    }, this).join('');
  }
};

export function highlightNavTab(route: Router, render: Renderer2, tabsList: NodeList, refNavbar: HTMLElement) {
  let currentRoute = route.url;
  const pathToExclude = refNavbar.getAttribute("attr-mainPath");
  //console.log(pathToExclude);

  // pomin onaczanie trasy jesli to glowna sciezka
  if (currentRoute != pathToExclude) {
    tabsList.forEach(e => {
      let currentNode = (e as HTMLLIElement);
      render.removeClass(currentNode, "active");

      // pomin onaczanie trasy jesli to glowna sciezka
      if (currentNode.getAttribute('data-href') != pathToExclude) {
        if (currentRoute.includes(currentNode.getAttribute('data-href')!)) {
          render.addClass(currentNode, "active");
        }
      }
    });
  }

    route.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((navEnd) => {
        //console.log(navEnd);
        tabsList.forEach(e => {
          let currentNode = (e as HTMLLIElement);
          render.removeClass(currentNode, "active");

          if (currentNode.getAttribute('data-href') === pathToExclude) {
            if (navEnd.urlAfterRedirects === pathToExclude) {
              render.addClass(currentNode, "active");
            }
          } else {
            if (navEnd.urlAfterRedirects.includes(currentNode.getAttribute('data-href')!)) {
              render.addClass(currentNode, "active");
            }
          }
        });
      });
}
