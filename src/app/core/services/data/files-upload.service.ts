import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataLoadersService} from "../utlis/data-loaders.service";

@Injectable({
  providedIn: 'root'
})
export class FilesUploadService {
  baseURL: string;
  upDataURL: string;
  delDataURL: string;
  setCoverPhotoURL: string;

  constructor(
    private http: HttpClient,
    private data: DataLoadersService
  ) {
    this.baseURL          = data.conf.api.endpointURLS.dataMgr.basePath;
    this.upDataURL        = data.conf.api.endpointURLS.dataMgr.uploadData;
    this.delDataURL       = data.conf.api.endpointURLS.dataMgr.deleteData;
    this.setCoverPhotoURL = data.conf.api.endpointURLS.dataMgr.setCoverPhoto;
  }

  uploadData(id: string, myFiles: FormData) {
    return this.http.put<void>(this.baseURL+this.upDataURL+`/${id}`, myFiles, {reportProgress: true, observe: 'events'});
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
