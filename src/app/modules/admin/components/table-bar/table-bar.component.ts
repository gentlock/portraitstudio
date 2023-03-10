import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subscription} from "rxjs";
// import { elapsedTime } from "../../../../core/helpers/utils";
import {MyservicesService} from "../../../../core/services/data/myservices.service";
import {AlbumsService} from "../../../../core/services/data/albums.service";
import {IMyserviceFeed} from "../../../../core/abstracts";
// import { SharedModule } from "../../../../core/shared.module";

@Component({
  selector: 'table-bar',
  templateUrl: './table-bar.component.html',
  styleUrls: ['./table-bar.component.scss']
})
export class TableBarComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input() useService!: MyservicesService|AlbumsService;
  data$!: Observable<any>;
  services$!: Observable<IMyserviceFeed[]>;
  @Output() editRequest: EventEmitter<any> = new EventEmitter();
  @Output() deleteRequest: EventEmitter<any> = new EventEmitter();
  @Output() resetFormRequest: EventEmitter<any> = new EventEmitter();
  @Input() events!: Observable<string>;
  @Input() selectableService!: boolean;
  eventsSubscription!: Subscription;
  currentCard: string = "";

  constructor(
    private myservicesService: MyservicesService,
    // private albumsService: AlbumsService,
  ) {
    this.services$ = myservicesService.getAll();
  }

  resetActiveCards() {
    document.querySelectorAll('div.card').forEach((item) => {
      item.classList.remove('bg-rose-100');
    })
  }
  editThis(e: Event, id: string) {
    e.preventDefault();
    this.resetActiveCards();

    let div = (e.target as HTMLElement).closest('div.card')!;
    div.classList.add('bg-rose-100');
    this.currentCard = id;

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
    this.data$ = this.useService.getAll();
  }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe((id) => {
        this.currentCard = id;
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
