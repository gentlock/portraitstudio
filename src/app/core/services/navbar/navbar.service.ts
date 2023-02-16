import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  action = new Subject<boolean>();

  expand() {
    this.action.next(true);
  }

  shrink() {
    this.action.next(false)

  }
  constructor() { }
}
