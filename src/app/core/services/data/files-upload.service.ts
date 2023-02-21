import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataLoadersService} from "../utlis/data-loaders.service";
import {IAlbumsFeed, ICarouselFeed, IMyserviceFeed} from "../../abstracts";

@Injectable({
  providedIn: 'root'
})
export class FilesUploadService {
  baseURL: string;
  upDataURL: string;
  delDataURL: string;
  fetchGalleryURL: string;
  setCoverPhotoURL: string;

  constructor(
    private http: HttpClient,
    private data: DataLoadersService
  ) {
    this.baseURL          = data.conf.api.endpointURLS.dataMgr.basePath;
    this.upDataURL        = data.conf.api.endpointURLS.dataMgr.uploadData;
    this.delDataURL       = data.conf.api.endpointURLS.dataMgr.deleteData;
    this.setCoverPhotoURL = data.conf.api.endpointURLS.dataMgr.setCoverPhoto;
    this.fetchGalleryURL  = data.conf.api.endpointURLS.dataMgr.fetchGallery;
  }

  uploadData(id: string, useSchema: string, myFiles: FormData) {
    return this.http.put<void>(this.baseURL+this.upDataURL+`/${id}`+`/${useSchema}`, myFiles, {reportProgress: true, observe: 'events'});
  }

  fetchGallery(id: string, useSchema: string) {
    return this.http.get<IAlbumsFeed|IMyserviceFeed|ICarouselFeed>(this.baseURL+this.upDataURL+`/${id}`+`/${useSchema}`);
  }

  deleteFile(id: string) {
    return this.http.delete<void>(this.delDataURL+`/${id}`);
  }

  // loadCollection(id: string, myFiles: FormData) {
  //   return this.http.delete<string[]>(this.delFileURL+`/${id}`);
  // }

  setCoverPhoto(id: string, collection: string) {
    return this.http.get<void>(this.baseURL+this.setCoverPhotoURL+`/${id}/${collection}`);
  }
}
