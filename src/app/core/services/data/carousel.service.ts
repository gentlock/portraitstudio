import { Injectable } from '@angular/core';
import { DatePipe } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICarouselFeed } from "../../abstracts";
import {DataLoadersService} from "../utlis/data-loaders.service";

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  readonly urls;
  readonly basePath;

  constructor(
    private data: DataLoadersService,
    private http: HttpClient,
  ) {
    this.urls       = data.conf.api.endpointURLS.carousel;
    this.basePath   = data.conf.api.endpointURLS.carousel.basePath;
  }

  getAll() {
    return this.http.get<ICarouselFeed[]>(this.basePath+''+this.urls.getAll);
  }
  getById(id: string) {
    return this.http.get<ICarouselFeed>(this.basePath+''+this.urls.getById+`/${id}`);
  }
  addNew(data: ICarouselFeed) {

    return this.http.post<string>(this.basePath+''+this.urls.addNew, data);
  }
  update(id: string, data: ICarouselFeed) {
    return this.http.put<string>(this.basePath+''+this.urls.update+`/${id}`, data);
  }
  uploadPhoto(id: string, data: FormData) {
    return this.http.put<ICarouselFeed>(this.basePath+''+this.uploadPhoto+`/${id}`, data, {reportProgress: true, observe: 'events'});

  }
  delete(id: string) {
    return this.http.delete<ICarouselFeed>(this.basePath+''+this.urls.remove+`/${id}`);
  }
}
