import {Component, EventEmitter, Output} from '@angular/core';
import { Subject } from 'rxjs';
import {LoaderService} from "../../../../core/services/loader/loader.service";

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  // @Output() loadingComplete: EventEmitter<any> = new EventEmitter();
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private loaderService: LoaderService
  ) {
  }

}
