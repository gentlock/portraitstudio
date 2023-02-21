import {Component, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {clearFormField} from "../../../../core/helpers/utils";
import { ICarouselFeed } from "../../../../core/abstracts";
import { CarouselService } from "../../../../core/services/data/carousel.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Subject} from "rxjs";


@Component({
  selector: 'studio-carousel-mgr',
  templateUrl: './carousel-mgr.component.html',
  styleUrls: ['./carousel-mgr.component.scss']
})

export class CarouselMgrComponent {
  myFormModel: FormGroup;
  clearField = clearFormField;

  DBschema = 'carouselSchema';

  eventsSubject: Subject<string> = new Subject<string>();

  constructor(
    private _fb: FormBuilder,
    public carouselService: CarouselService,
  ) {
    this.myFormModel = _fb.group({
      'id':[''],
      'isActive':[''],
      'name': ['', Validators.required],
      'subtitle': ['', Validators.required],
      'desc': ['', Validators.required],
    });
  }

  refreshSignal(id: string) {
    this.eventsSubject.next(id);
  }

  populate = ( id: string ) => {
    this.carouselService.getById( id ).subscribe(
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

  db_delete = ( id: string ) => {

    this.carouselService.db_delete(id).subscribe(
      {
        next: (value)=>{
          this.refreshSignal('');
          // console.log(value)
        },
        error: (err: HttpErrorResponse)=>{ console.log(err)}
      })
  }

  ngOnSubmit = (e: Event) => {
    e.preventDefault();
    let id = this.myFormModel.get('id')?.value;

    const data: ICarouselFeed = {
      'isActive'    : this.myFormModel.get('isActive')?.value || false,
      'name'        : this.myFormModel.get('name')?.value,
      'subtitle'    : this.myFormModel.get('subtitle')?.value,
      'desc'        : this.myFormModel.get('desc')?.value,
    }

    if(this.myFormModel.valid) {
      if(!!id) {
        this.carouselService.db_update(id, data).subscribe(
          {
            next: (value)=>{
              this.populate(value._id!);
              this.refreshSignal(value._id!);
            },
            error: (err: HttpErrorResponse)=>{ console.log(err)}
          }
        );
      } else  {
        this.carouselService.addNew(data).subscribe(
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
