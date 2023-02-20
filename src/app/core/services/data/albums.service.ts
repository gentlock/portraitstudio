import { Injectable } from '@angular/core';
import {DataLoadersService} from "../utlis/data-loaders.service";
import {HttpClient} from "@angular/common/http";
import {IAlbumsFeed} from "../../abstracts";

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  readonly urls;
  readonly basePath;

  constructor(
    private data: DataLoadersService,
    private http: HttpClient,
  ) {
    this.urls       = data.conf.api.endpointURLS.albums;
    this.basePath   = data.conf.api.endpointURLS.albums.basePath;
  }

  getAll() {
    return this.http.get<IAlbumsFeed[]>(this.basePath+''+this.urls.getAll);
  }
  getById(id: string) {
    return this.http.get<IAlbumsFeed>(this.basePath+''+this.urls.getById+`/${id}`);
  }
  addNew(data: IAlbumsFeed) {

    return this.http.post<IAlbumsFeed>(this.basePath+''+this.urls.addNew, data);
  }
  update(id: string, data: IAlbumsFeed) {
    return this.http.put<IAlbumsFeed>(this.basePath+''+this.urls.update+`/${id}`, data);
  }
  // uploadPhoto(id: string, data: FormData) {
  //   return this.http.put<ICarouselFeed>(this.basePath+''+this.uploadPhoto+`/${id}`, data, {reportProgress: true, observe: 'events'});
  //
  // }
  delete(id: string) {
    return this.http.delete<IAlbumsFeed>(this.basePath+''+this.urls.remove+`/${id}`);
  }
}
