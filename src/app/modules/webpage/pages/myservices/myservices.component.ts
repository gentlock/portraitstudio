import {AfterViewInit, Component} from '@angular/core';
import {Observable} from "rxjs";
import {IMyserviceFeed} from "../../../../core/abstracts";
import {MyservicesService} from "../../../../core/services/data/myservices.service";

@Component({
  selector: 'studio-myservices',
  templateUrl: './myservices.component.html',
  styleUrls: ['./myservices.component.scss']
})
export class MyservicesComponent implements AfterViewInit{
  data$!: Observable<IMyserviceFeed[]>;
  details$!: Observable<IMyserviceFeed>;
  showDetails = false;
  id!: string;
  constructor(
    private myservicesService: MyservicesService
  ) {
    this.data$ = myservicesService.getAll();
  }

  switchView(e: Event, id: string) {
    this.showDetails = true;
    this.id = id;

    this.details$ = this.myservicesService.getById(this.id);
  }

  ngAfterViewInit() {

  }
}
