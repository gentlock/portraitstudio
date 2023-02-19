import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {clearFormField} from "../../../../core/helpers/utils";

@Component({
  selector: 'studio-myservices-mgr',
  templateUrl: './myservices-mgr.component.html',
  styleUrls: ['./myservices-mgr.component.scss']
})
export class MyservicesMgrComponent {
  myFormModel: FormGroup;
  clearField = clearFormField;

  constructor(
  private _fb: FormBuilder,

) {
  this.myFormModel = _fb.group({
    'id':[''],
    'action':['action'],
    'isActive':[''],
    'name': ['', Validators.required],
    'desc': ['', Validators.required],
    'priceList': ['', Validators.required],
  });
}

  ngOnSubmit = (e: Event) => {
    e.preventDefault();
  }
}
