import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {myPasswordGenerator, clearFormField} from "../../../../core/helpers/utils";

@Component({
  selector: 'studio-albums-mgr',
  templateUrl: './albums-mgr.component.html',
  styleUrls: ['./albums-mgr.component.scss']
})
export class AlbumsMgrComponent {
  myFormModel: FormGroup;
  clearField = clearFormField;

  constructor(
    private _fb: FormBuilder,
  ) {
      this.myFormModel = _fb.group({
        'id':[''],
        'action':[''],
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
  }

  generatePassword(event: Event) {
    event.preventDefault();
    this.myFormModel.get('accessCode')?.setValue( myPasswordGenerator.generate(8) );
  }

  ngOnLinkClick(e: Event, id: any, action: string) {
    e.preventDefault();

      if(id && action === 'del') {
        if(prompt('wpisz: tak') === 'tak') {
          // this.localeDeleteService(uniqId);
          // this.resetAll();
          // this.updateTable();
        } else {
          alert("niepoprawny numer id !!");
        }
      } else {
        // this.localPopulate(uniqId);
      }
    }
}
