import { Component, OnInit } from '@angular/core';
import { forms } from '../Model/forms';
import { ServicesService } from '../services/services.service';
import {field} from '../Model/field';

@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss']
})
export class FillFormComponent implements OnInit {

  constructor(public service:ServicesService){}
  ngOnInit(): void {
    this.service.GetFormField(1,1).subscribe(res=>{
      this.field = res;
      console.log(this.field,res);
        this.forms.fieldsList = this.field;
    })
  }

  field!:field[];

  forms: forms = {
    formname: '',
    description: '',
    versionnumber: 0,
    fieldsList:[],
  };

  submitForm(){

  }

}
