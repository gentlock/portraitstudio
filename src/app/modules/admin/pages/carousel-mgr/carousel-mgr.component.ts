import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {clearFormField} from "../../../../core/helpers/utils";
import { ICarouselFeed } from "../../../../core/abstracts";
import { CarouselService } from "../../../../core/services/data/carousel.service";

@Component({
  selector: 'studio-carousel-mgr',
  templateUrl: './carousel-mgr.component.html',
  styleUrls: ['./carousel-mgr.component.scss']
})

export class CarouselMgrComponent {
  myFormModel: FormGroup;
  clearField = clearFormField;

  constructor(
    private _fb: FormBuilder,
    private carouselService: CarouselService,
  ) {
    this.myFormModel = _fb.group({
      'id':[''],
      'action':[''],
      'is-active':[''],
      'name': ['', Validators.required],
      'subtitle': ['', Validators.required],
      'desc': ['', Validators.required],
    });
  }

  ngOnSubmit = (e: Event) => {
    e.preventDefault();
    let id = this.myFormModel.get('id')?.value;
    let action = this.myFormModel.get('action')?.value;
    const data: ICarouselFeed = {
      'is-active'   : this.myFormModel.get('activeOrNot')?.value || false,
      'name'        : this.myFormModel.get('name')?.value,
      'subtitle'    : this.myFormModel.get('subtitle')?.value,
      'desc'        : this.myFormModel.get('desc')?.value,
    }

    if(this.myFormModel.valid) {

      if( action  === 'UPDATE' ) {
        // this.carouselService.update(id, data);
      } else  {
        this.carouselService.addNew(data);
      }
    }
  }
}
