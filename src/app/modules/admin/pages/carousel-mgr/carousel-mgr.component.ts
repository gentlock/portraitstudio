import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {clearFormField} from "../../../../core/helpers/utils";

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
  }
}
