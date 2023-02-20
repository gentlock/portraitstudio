import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {myPasswordGenerator, clearFormField} from "../../../../core/helpers/utils";
import { AlbumsService } from "../../../../core/services/data/albums.service";
import {Subject} from "rxjs";
import {IAlbumsFeed} from "../../../../core/abstracts";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'studio-albums-mgr',
  templateUrl: './albums-mgr.component.html',
  styleUrls: ['./albums-mgr.component.scss']
})
export class AlbumsMgrComponent {
  myFormModel: FormGroup;
  clearField = clearFormField;
  serviceName = 'albumsService';
  eventsSubject: Subject<void> = new Subject<void>();


  constructor(
    private _fb: FormBuilder,
    private albumsService: AlbumsService
  ) {
      this.myFormModel = _fb.group({
        'id':[''],
        'isActive':[''],
        'name': ['', Validators.required],
        'clientName': ['', Validators.required],
        'clientEmail': ['', Validators.email],
        'accessCode': ['', Validators.required],
        'desc': ['', Validators.required],
        'serviceId': ['', Validators.required],
        'clientInfo'  : ['']
      });
  }

  sendEmail(event: Event, email: string) {
    event.preventDefault();

    if(prompt("wpisz słowo: tak") === 'tak') {
      alert("wyslany");
    }
  }

  ngOnSubmit = (e: Event) => {
    e.preventDefault();
    let id = this.myFormModel.get('id')?.value;

    const data: IAlbumsFeed = {
      'isActive'      : this.myFormModel.get('isActive')?.value || false,
      'name'          : this.myFormModel.get('name')?.value,
      'clientName'    : this.myFormModel.get('clientName')?.value,
      'clientEmail'   : this.myFormModel.get('clientEmail')?.value,
      'accessCode'    : this.myFormModel.get('accessCode')?.value,
      'desc'          : this.myFormModel.get('desc')?.value,
      'serviceId'     : this.myFormModel.get('serviceId')?.value,
      'clientInfo'    : this.myFormModel.get('clientInfo')?.value,
    }

    if(this.myFormModel.valid) {
      if( id != "" ) {
        this.albumsService.update(id, data).subscribe(
          {
            next: (value)=>{
              // console.log(value);
              this.refreshTableSignal();
            },
            error: (err)=>{ console.log(err)}
          }
        );
      } else  {
        this.albumsService.addNew(data).subscribe(
          {
            next: (value)=>{
              // console.log(value);
              this.refreshTableSignal();
            },
            error: (err)=>{ console.log(err)}
          }
        );
      }
    }

  }

  delete = ( id: string ) => {
    this.albumsService.delete(id).subscribe(
      {
        next: (value)=>{ console.log(value)},
        error: (err)=>{ console.log(err)}
      })
  }

  populate = ( id: string ) => {
    this.albumsService.getById( id ).subscribe(
      {
        next: (data) => {
          this.myFormModel.get('id')?.setValue(id);
          this.myFormModel.get('isActive')?.setValue(<boolean>data.isActive);
          this.myFormModel.get('name')?.setValue(data.name);
          this.myFormModel.get('clientName')?.setValue(data.clientName);
          this.myFormModel.get('clientEmail')?.setValue(data.clientEmail);
          this.myFormModel.get('accessCode')?.setValue(data.accessCode);
          this.myFormModel.get('desc')?.setValue(data.desc);
          this.myFormModel.get('serviceId')?.setValue(data.serviceId);
          this.myFormModel.get('clientInfo')?.setValue(data.clientInfo);
        },
        error: (err: HttpErrorResponse) => { console.log(err) }
      }
    )
  }

  resetForm(e: Event) {
    this.myFormModel.reset();
  }

  refreshTableSignal() {
    this.eventsSubject.next();
  }

  generatePassword(event: Event) {
    event.preventDefault();
    this.myFormModel.get('accessCode')?.setValue( myPasswordGenerator.generate(8) );
  }
}
