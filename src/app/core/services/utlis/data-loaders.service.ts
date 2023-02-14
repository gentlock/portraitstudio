import { Injectable } from '@angular/core';
// import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import * as configuration from '../../../../conf/config.json';

@Injectable({
  providedIn: 'root'
})
export class DataLoadersService {
  public conf = configuration;
  constructor(
    // private http: HttpClient
  ) {}
}
