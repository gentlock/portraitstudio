import {AfterViewInit, Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {myPasswordGenerator, clearFormField} from "../../../../core/helpers/utils";
import { AlbumsService } from "../../../../core/services/data/albums.service";
import {Observable, Subject} from "rxjs";
import {IAlbumsFeed, IMyserviceFeed} from "../../../../core/abstracts";
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {MyservicesService} from "../../../../core/services/data/myservices.service";
import { FilesUploadService } from "../../../../core/services/data/files-upload.service";

@Component({
  selector: 'studio-albums-mgr',
  templateUrl: './albums-mgr.component.html',
  styleUrls: ['./albums-mgr.component.scss']
})
export class AlbumsMgrComponent implements AfterViewInit {
  myFormModel: FormGroup;
  clearField = clearFormField;
  servicesList$!: Observable<IMyserviceFeed[]>;
  eventsSubject: Subject<string> = new Subject<string>();
  progressValue = 0;
  DBschema = 'albumsSchema';

  constructor(
    private _fb: FormBuilder,
    public albumsService: AlbumsService,
    public myservicesService: MyservicesService,
    private filesUploadService: FilesUploadService
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

  ngAfterViewInit() {
    this.servicesList$ = this.myservicesService.getAll();
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
      if(!!id) {
        // console.log("uaktualniam");

        this.albumsService.db_update(id, data).subscribe(
          {
            next: (value)=>{
              this.populate(value._id!);
              this.refreshSignal(value._id!);
            },
            error: (err: HttpErrorResponse)=>{ console.log(err)}
          }
        );
      } else {
        // console.log("dodaje");
        this.albumsService.addNew(data).subscribe(
          {
            next: (value) => {
              this.populate(value._id!);
              this.refreshSignal(value._id!);
            },
            error: (err: HttpErrorResponse) => {
              console.log(err)
            }
          });
      }
    }
  }

  db_delete = ( id: string ) => {
    this.albumsService.db_delete(id).subscribe(
      {
        next: (value)=>{
          this.refreshSignal('');
          // console.log(value)
        },
        error: (err: HttpErrorResponse)=>{ console.log(err)}
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

  handleUpload(event: Event) {
    event.preventDefault();

    let formData    = new FormData();
    let element     = event.currentTarget as HTMLInputElement;
    let fileslist   = element.files;
    let id = this.myFormModel.get('id')?.value;

    if( !!fileslist && !!id ) {
      formData.append('file', fileslist[0]);

      this.filesUploadService.uploadSingle(id, formData).subscribe(
        {
          next: (event) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progressValue = Math.round(event.loaded / event.total! * 100);
            } else if (event.type === HttpEventType.Response) {
            }
          },
          error: (err) => {}
        })
    }
  }

  resetForm(e: Event) {
    this.myFormModel.get('id')?.setValue(null);
    this.myFormModel.reset();
  }

  refreshSignal(id: string) {
    this.eventsSubject.next(id);
  }

  generatePassword(event: Event) {
    event.preventDefault();
    this.myFormModel.get('accessCode')?.setValue( myPasswordGenerator.generate(8) );
  }
}
