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
    { id: 1, name: 'John Doe',
      formResponse: 'Response1' },];
  forms: forms = {
    formname: this.formname,
    description: this.desc,
    versionnumber: 0,
    fieldsList: []
  };

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

  addField(type: string) {
    this.type = type;
    const dialogRef = this.dialog.open(FormPopupComponent, {
      width: '250px',
      data: { name: type }
    });

    dialogRef.afterClosed().subscribe(res => {


      if (type == "Text") {
        const newField: field = {
          indexs: 1,
          isoptional: res.data1.isoptional,
          toolid: 1,
          names: res.data1.name,
          fieldName: res.data1.fieldName
        };

        
        this.forms.fieldsList.push(newField);
        this.forms.fieldsList.slice(newField.indexs,0);


      } else if (type == "Radio Button") {
        const newradio: field = {
          fieldName: res.data1.fieldName,
          indexs: 3,
          isoptional: res.data1.isoptional,
          toolid: 3,
          names: res.data1.name
        };
        this.forms.fieldsList.push(newradio);
        this.forms.fieldsList.slice(newradio.indexs);

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
      
    });
  }

}
