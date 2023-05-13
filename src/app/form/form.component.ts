import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormPopupComponent } from '../form-popup/form-popup.component';


interface Field {
  name: string;
  isOptional: boolean;
  type: string;
  options?: string[];
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  userlist = [
    { id: 1, name: 'John Doe', formResponse: 'Response1' },
    { id: 2, name: 'Jane Smith', formResponse: 'Response2' },
    { id: 3, name: 'Bob Johnson', formResponse: 'Response3' },
    { id: 4, name: 'Kate Johnson', formResponse: 'Response3' },
    { id: 5, name: 'Helmon peters', formResponse: 'Response3' },
    { id: 6, name: 'Mary Dcousta', formResponse: 'Response3' }
  ];

  fields: Array<Field> = [];
  
  constructor(public dialog: MatDialog) {
  }
  
  
  addField(type : string) {
    const dialogRef = this.dialog.open(FormPopupComponent, {
      width: '500px',
      data:{name : type}
    });
    
    dialogRef.afterClosed().subscribe(res => {

      if(type == "text" && res.data1.f){
        const newTextField: Field = {
          name: res.data1.f,
          isOptional: res.data1.isOptional,
          type: "text"
          
        };
        this.fields.push(newTextField);
      } else if (type == "radio" && res.data1.f) {
        const newRadioField: Field = {
          name: res.data1.f,
          isOptional: res.data1.isOptional,
          type: "radio",
          options: res.data1.options
        };
        this.fields.push(newRadioField);
      } else if (type == "checkbox"&& res.data1.f) {
        const newCheckboxField: Field = {
          name: res.data1.f,
          isOptional: res.data1.isOptional,
          type: "checkbox",
          options: res.data1.options
        };
        this.fields.push(newCheckboxField);
      }else if(type =="button"&& res.data1.f)
      {
        const newbutton: Field={
        name:res.data1.f,
        isOptional: false,
        type:"button"
      };
      this.fields.push(newbutton);
      }else if(type =="DatePicker"&& res.data1.f)
      {
        const newbutton: Field={
        name:res.data1.f,
        isOptional: res.data1.isOptional,
        type:"DatePicker"
      };
      this.fields.push(newbutton);
      }
    });
    
    console.log(this.fields);
    
  }

  

  // When user close the dialog
  // dialogWithForm.afterClosed().subscribe(result => {
  // console.log('You have closed the dialog');
  // if (result) {
  // this.test.name = result.firstName;
  // this.lastName = result.lastName;
  // this.fields.push(this.test);
  // }
  // });
}
