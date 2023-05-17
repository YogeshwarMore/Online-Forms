import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormPopupComponent } from '../form-popup/form-popup.component';
import { forms } from '../Model/forms';
import { ServicesService } from '../services/services.service';
import { field } from '../Model/field';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  formname: string = "";
  desc: string = "";
  version:number=1;
  tools: any;
  type: any;
  indexs:any;
  field!:field[];

  constructor(public dialog: MatDialog, public service: ServicesService,private route: ActivatedRoute ) {
    this.service.Gettool().subscribe(res => {
      this.tools = res;
    });
  }


  userlist = [
<<<<<<< HEAD
    { id: 1, name: 'John Doe',
      formResponse: 'Response1' },];
=======
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

>>>>>>> 89f4d68668da71697cc9580e1703ca09117ac647
  forms: forms = {
    formname: this.formname,
    description: this.desc,
    versionnumber: 0,
    fieldsList: []
  };

<<<<<<< HEAD
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['data']==undefined)
      return

      const serializedData = params['data'];
     
      const data:forms = JSON.parse(serializedData);

      this.formname=data.formname;
      this.desc=data.formname;
      this.version=data.versionnumber+1;
      this.service.GetFormField(1,params['data2']).subscribe(res=>
        {
          this.field=res;
          this.forms.fieldsList=this.field;
        });
  
    });
  }
 
loadFields()
{
  this.forms.formname = this.formname;
  this.forms.description = this.desc;
  this.forms.versionnumber = this.version;
}


  saveforms() {
    this.loadFields();
    if (!this.forms.formname || !this.forms.description) {
      console.log("Please provide a form name and description.");
      return;
    }

    if (this.forms.fieldsList.length === 0) {
      console.log("Please add at least one field to the form.");
      return;
    }
    this.service.saveForms(this.forms, 1);
  }

=======
  constructor(public dialog: MatDialog, public service: ServicesService) {
    this.service.Gettool().subscribe(res => {
      this.tools = res;
    });
  }

  saveforms() {
    this.service.saveForms(this.forms, 1);
  }

>>>>>>> 89f4d68668da71697cc9580e1703ca09117ac647
  addField(type: string) {
    this.type = type;
    const dialogRef = this.dialog.open(FormPopupComponent, {
      width: '250px',
<<<<<<< HEAD
      data: { name: type }
    });

    dialogRef.afterClosed().subscribe(res => {

=======
      data: { name: type },
      panelClass: 'dialog-container'

    });

    dialogRef.afterClosed().subscribe(res => {
      this.forms.formname = this.formname;
      this.forms.description = this.desc;
      this.forms.versionnumber = 0;
>>>>>>> 89f4d68668da71697cc9580e1703ca09117ac647

      if (type == "Text") {
        const newField: field = {
          indexs: 1,
          isoptional: res.data1.isoptional,
          toolid: 1,
          names: res.data1.name,
          fieldName: res.data1.fieldName
        };

<<<<<<< HEAD
        
        this.forms.fieldsList.push(newField);
        this.forms.fieldsList.slice(newField.indexs,0);
=======
        this.forms.fieldsList.push(newField);
>>>>>>> 89f4d68668da71697cc9580e1703ca09117ac647


      } else if (type == "Radio Button") {
        const newradio: field = {
          fieldName: res.data1.fieldName,
          indexs: 3,
          isoptional: res.data1.isoptional,
          toolid: 3,
          names: res.data1.name
        };
        this.forms.fieldsList.push(newradio);
<<<<<<< HEAD
        this.forms.fieldsList.slice(newradio.indexs);
=======
>>>>>>> 89f4d68668da71697cc9580e1703ca09117ac647

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
<<<<<<< HEAD
      
=======
      console.log(this.forms);
>>>>>>> 89f4d68668da71697cc9580e1703ca09117ac647
    });
  }

}
