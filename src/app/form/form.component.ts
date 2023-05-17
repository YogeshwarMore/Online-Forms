import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormPopupComponent } from '../form-popup/form-popup.component';
import { forms } from '../Model/forms';
import { ServicesService } from '../services/services.service';
import { field } from '../Model/field';

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

  formname: string = "";
  desc: string = "";
  tools: any;
  type: any;

  forms: forms = {
    formname: this.formname,
    description: this.desc,
    versionnumber: 0,
    fieldsList: []
  };

  constructor(public dialog: MatDialog, public service: ServicesService) {
    this.service.Gettool().subscribe(res => {
      this.tools = res;
    });
  }

  saveforms() {
    this.service.saveForms(this.forms, 1);
  }

  addField(type: string) {
    this.type = type;
    const dialogRef = this.dialog.open(FormPopupComponent, {
      width: '250px',
      data: { name: type },
      panelClass: 'dialog-container'

    });

    dialogRef.afterClosed().subscribe(res => {
      this.forms.formname = this.formname;
      this.forms.description = this.desc;
      this.forms.versionnumber = 0;

      if (type == "Text") {
        const newField: field = {
          indexs: 1,
          isoptional: res.data1.isoptional,
          toolid: 1,
          names: res.data1.name,
          fieldName: res.data1.fieldName
        };

        this.forms.fieldsList.push(newField);


      } else if (type == "Radio Button") {
        const newradio: field = {
          fieldName: res.data1.fieldName,
          indexs: 1,
          isoptional: res.data1.isoptional,
          toolid: 3,
          names: res.data1.name
        };
        this.forms.fieldsList.push(newradio);

      } else if (type == "Check Box") {
        const newcheck: field = {
          fieldName: res.data1.fieldName,
          indexs: 1,
          isoptional: res.data1.isoptional,
          toolid: 2,
          names: res.data1.name
        };
        this.forms.fieldsList.push(newcheck);

      } else if (type == "button") {
        const newbutton: field = {
          fieldName: res.data1.fieldName,
          indexs: 1,
          isoptional: res.data1.isoptional,
          toolid: 8,
          names: res.data1.name
        };
        this.forms.fieldsList.push(newbutton);

      } else if (type == "DateTime") {
        const newDate: field = {
          fieldName: res.data1.fieldName,
          indexs: 1,
          isoptional: res.data1.isoptional,
          toolid: 5,
          names: res.data1.name
        };
        this.forms.fieldsList.push(newDate);

      }
      console.log(this.forms);
    });
  }

}
