import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormPopupComponent } from '../form-popup/form-popup.component';

interface Field {
  name: string;
  isOptional: boolean;
  type: string;
  options?: { label: string, value: string }[]
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
      width: '250px'
    });
    
    dialogRef.afterClosed().subscribe(res => {

      if(type == "text"){
        const newTextField: Field = {
          name: res.data.f,
          isOptional: res.data.isOptional,
          type: "text"
        };
        this.fields.push(newTextField);
      } else if (type == "radio") {
        const newRadioField: Field = {
          name: res.data.f,
          isOptional: res.data.isOptional,
          type: "radio",
          options: [{label: "Option 1", value: "option1"}, {label: "Option 2", value: "option2"}]
        };
        this.fields.push(newRadioField);
      } else if (type == "checkbox") {
        const newCheckboxField: Field = {
          name: res.data.f,
          isOptional: res.data.isOptional,
          type: "checkbox",
          options: [{label: "Option 1", value: "option1"}, {label: "Option 2", value: "option2"}]
        };
        this.fields.push(newCheckboxField);
      }
    }); 

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
