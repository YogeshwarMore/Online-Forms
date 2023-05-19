import { Component, OnInit } from '@angular/core';
import { forms } from '../Model/forms';
import { ServicesService } from '../services/services.service';
import {field} from '../Model/field';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filledform } from '../Model/filledform';


interface demo{
  id:number,
  name:string,
  ischecked:any 

}
@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss']
})
export class FillFormComponent implements OnInit {
  names!:string;
  demo:demo[]=[];

  form!: FormGroup;
  field!:field[];
  i:number=0;
  option:any;
  filledform:filledform[]=[{
      formfieldid : 1,
      ischecked : 1,
      textvalue :  '' ,
      numericvalue : 1,
      datetimevalue : '' ,
      optionid : 1
    }
  ];
  forms: forms = {
    formname: '',
    description: '',
    versionnumber: 0,
    fieldsList:[],
  };

  
  constructor(public service:ServicesService, private formBuilder: FormBuilder){ this.form = this.formBuilder.group({});}
  ngOnInit(): void {

    this.service.GetFormField(1,1).subscribe(res=>{
      this.field = res;
        this.forms.fieldsList = this.field;
    })
    console.log(this.field);
  }

  updateCheckedOptions(field: any, i: any) {
    const index = this.demo.findIndex(d => d.id === i);
    if (index !== -1) {
      this.demo.splice(index, 1);
      console.log("pop");
    } else {
      console.log("push");
      const newDemo: demo = {
        id: i,
        name: field.fieldName,
        ischecked: field.formfieldid
      };
      this.demo.push(newDemo);
    }
    console.log(this.demo);
  }

  // valuestore(type:any)
  // {
  //   if(type==1)
  //   {
  //     const newfield:filledform={
  //       formfieldid : 1, //                   data from api required new api
  //       ischecked : null,
  //       textvalue :  this.names ,
  //       numericvalue : null,
  //       datetimevalue : null ,
  //       optionid : null
  //     }
  //   this.filledform.push(newfield);
  //     console.log(this.filledform);
  //   }
  //     else if(type==3)
  //     { const newradio:filledform={
  //       formfieldid : 1, //                   data from api required new api
  //       ischecked : null,
  //       textvalue :  this.names ,
  //       numericvalue : null,
  //       datetimevalue : null ,
  //       optionid : null

  //     }
  //     this.filledform.push(newradio);
  //   }
  //   // console.log(this.filledform);
  // }
  
  submitForm(){
   
  }

}
