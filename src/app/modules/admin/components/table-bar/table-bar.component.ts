import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CarouselService} from "../../../../core/services/data/carousel.service";
import { ICarouselFeed } from "../../../../core/abstracts";
import {Observable, Subscription} from "rxjs";
import { elapsedTime } from "../../../../core/helpers/utils";

@Component({
  selector: 'table-bar',
  templateUrl: './table-bar.component.html',
  styleUrls: ['./table-bar.component.scss']
})
export class TableBarComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input() useService!: string;
  data$!: Observable<ICarouselFeed[]>;
  readonly elapsedTime = elapsedTime;
  @Output() editRequest: EventEmitter<any> = new EventEmitter();
  @Output() deleteRequest: EventEmitter<any> = new EventEmitter();
  @Output() resetFormRequest: EventEmitter<any> = new EventEmitter();
  @Input() events!: Observable<void>;
  eventsSubscription!: Subscription;

  constructor(
    private carouselService: CarouselService,
  ) {
  }

  editThis(e: Event, id: string) {
    e.preventDefault();

    this.editRequest.emit(id);
  }

  deleteThis(e: Event, id: string) {
    e.preventDefault();

    if(prompt('wpisz słowo: tak') === 'tak') {
      this.deleteRequest.emit(id);
    }
  }

  resetForm() {
    this.resetFormRequest.emit();
  }
  refreshTable() {
    this.data$ = this.carouselService.getAll();
  }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe(() => {
        this.refreshTable();
    } );
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.refreshTable();
  }
}
