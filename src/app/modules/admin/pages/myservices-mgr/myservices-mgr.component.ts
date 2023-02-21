import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { MyservicesService } from "../../../../core/services/data/myservices.service";
import {clearFormField} from "../../../../core/helpers/utils";
import {Subject} from "rxjs";
import {IMyserviceFeed} from "../../../../core/abstracts";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'studio-myservices-mgr',
  templateUrl: './myservices-mgr.component.html',
  styleUrls: ['./myservices-mgr.component.scss']
})
export class MyservicesMgrComponent {
  myFormModel: FormGroup;
  clearField = clearFormField;
  serviceName = 'myservicesService';
  eventsSubject: Subject<string> = new Subject<string>();


  constructor(
  private _fb: FormBuilder,
  private myservicesService: MyservicesService

) {
  this.myFormModel = _fb.group({
    'id':[''],
    'action':['action'],
    'isActive':[''],
    'name': ['', Validators.required],
    'subtitle': ['', Validators.required],
    'desc': ['', Validators.required],
    'priceList': ['', Validators.required],
  });
}
  refreshSignal(id: string) {
    this.eventsSubject.next(id);
  }

  db_delete = ( id: string ) => {
    this.myservicesService.db_delete(id).subscribe(
      {
        next: (value)=>{
          this.refreshSignal('');
          // console.log(value)
        },
        error: (err: HttpErrorResponse)=>{ console.log(err)}
      })
  }

  populate = ( id: string ) => {
    this.myservicesService.getById( id ).subscribe(
      {
        next: (data) => {
          this.myFormModel.get('id')?.setValue(id);
          this.myFormModel.get('isActive')?.setValue(<boolean>data.isActive);
          this.myFormModel.get('name')?.setValue(data.name);
          this.myFormModel.get('desc')?.setValue(data.desc);
          this.myFormModel.get('subtitle')?.setValue(data.subtitle);
        },
        error: (err: HttpErrorResponse) => { console.log(err) }
      }
    )
  }

  resetForm(e: Event) {
    this.myFormModel.get('id')?.setValue(null);
    this.myFormModel.reset();
  }

  ngOnSubmit = (e: Event) => {
    e.preventDefault();
    let id = this.myFormModel.get('id')?.value;

    const data: IMyserviceFeed = {
      'isActive'    : this.myFormModel.get('isActive')?.value || false,
      'name'        : this.myFormModel.get('name')?.value,
      'subtitle'    : this.myFormModel.get('subtitle')?.value,
      'desc'        : this.myFormModel.get('desc')?.value,
      'priceList'   : this.myFormModel.get('priceList')?.value
    }

    if(this.myFormModel.valid) {
      if(!!id) {
        // console.log('uaktualniam');
        this.myservicesService.db_update(id, data).subscribe(
          {
            next: (value)=>{
              this.populate(value._id!);
              this.refreshSignal(value._id!);
            },
            error: (err: HttpErrorResponse)=>{ console.log(err)}
          }
        );
      } else  {
        // console.log('dodaje nowy');
        this.myservicesService.addNew(data).subscribe(
          {
            next: (value)=>{
              this.populate(value._id!);
              this.refreshSignal(value._id!);
            },
            error: (err: HttpErrorResponse)=>{ console.log(err)}
          }
        );
      }
    }
  }
}
