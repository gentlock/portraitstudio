import { Injectable } from '@angular/core';
import {DataLoadersService} from "../utlis/data-loaders.service";
import {HttpClient} from "@angular/common/http";
import { IMyserviceFeed } from "../../abstracts";

@Injectable({
  providedIn: 'root'
})
export class MyservicesService {

  readonly urls;
  readonly basePath;

  constructor(
    private data: DataLoadersService,
    private http: HttpClient,
  ) {
    this.urls       = data.conf.api.endpointURLS.myservices;
    this.basePath   = data.conf.api.endpointURLS.myservices.basePath;
  }

  getAll() {
    return this.http.get<IMyserviceFeed[]>(this.basePath+''+this.urls.getAll);
  }
  getById(id: string) {
    return this.http.get<IMyserviceFeed>(this.basePath+''+this.urls.getById+`/${id}`);
  }
  addNew(data: IMyserviceFeed) {

    return this.http.post<IMyserviceFeed>(this.basePath+''+this.urls.addNew, data);
  }
  update(id: string, data: IMyserviceFeed) {
    return this.http.put<IMyserviceFeed>(this.basePath+''+this.urls.update+`/${id}`, data);
  }
  // uploadPhoto(id: string, data: FormData) {
  //   return this.http.put<ICarouselFeed>(this.basePath+''+this.uploadPhoto+`/${id}`, data, {reportProgress: true, observe: 'events'});
  //
  // }
  delete(id: string) {
    return this.http.delete<IMyserviceFeed>(this.basePath+''+this.urls.remove+`/${id}`);
  }
}
