import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormPopupComponent } from '../form-popup/form-popup.component';
import { forms } from '../model/forms';
import { ServicesService } from '../services/services.service';
import { field } from '../model/field';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  formname: string = '';
  desc: string = '';
  version: number = 1;
  formid: any = null;
  tools: any;
  type: any;
  indexs: number = 0;
  field!: field[];


  userlist = [
    { id: 1, name: 'John Doe', formResponse: 'Response1' },
    { id: 2, name: 'Kate Johnson', formResponse: 'Response2' },
    { id: 3, name: 'Will Parker', formResponse: 'Response3' },
    { id: 4, name: 'Jane Dcousta', formResponse: 'Response4' },
    { id: 5, name: 'Matthew Perry', formResponse: 'Response5' },
  ];

  forms: forms = {
    formname: '',
    description: '',
    versionnumber: 0,
    fieldsList: [],
  };



  constructor(
    public dialog: MatDialog,
    public service: ServicesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.service.Gettool().subscribe((res) => {
      this.tools = res;
    });

    this.route.queryParams.subscribe((params) => {

      if (params['data'] == undefined)
        return;
      const serializedData = params['data'];
      const serializedData2 = params['data2'];
      const data: forms = JSON.parse(serializedData);
      this.formid = data.formid;
      this.formname = data.formname;
      this.desc = data.description;
      this.version = JSON.parse(serializedData2).versionnumber;
      const i = JSON.parse(serializedData2).versionid;
      this.service.GetFormField(1, i).subscribe((res) => {
        this.field = res;
        this.forms.fieldsList = this.field;
      });
    });
  }

  drop(event: CdkDragDrop<field[]>): void {
    moveItemInArray(this.forms.fieldsList, event.previousIndex, event.currentIndex);
  }

  loadFields(): void {
    this.forms.formid = this.formid;
    this.forms.formname = this.formname;
    this.forms.description = this.desc;
    this.forms.versionnumber = this.version;
  }

  saveForms(): void {
    this.loadFields();

    if (!this.forms.formname || !this.forms.description) {
      alert("Insert Form Name or Desc");
      return;
    }

    if (this.forms.fieldsList.length === 0) {
      alert("No Field Added");
      return;
    }
    let j = 1;
    for (let i of this.forms.fieldsList) {
      if (i.fieldName == null)
        return alert("field name is null");
      i.indexs = j;
      j++;
    }

    this.service.saveForms(this.forms, this.forms.fieldsList);
    this.forms =
    {
      formname: '',
      description: '',
      versionnumber: 0,
      fieldsList: [],
    }
  }

  editField(field: field, type: number): void {
    if (field.toolid !== null && field.toolid !== undefined)
      type = field.toolid;
    const dialogRef = this.dialog.open(FormPopupComponent, {
      width: '250px',
      data: { name: type }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        field.names = res.data1.name;
        field.fieldName = res.data1.fieldName;
        field.isoptional = res.data1.isoptional;
      }
    });
  }

  deleteField(field: field): void {
    const index = this.forms.fieldsList.indexOf(field);
    if (index !== -1) {
      this.forms.fieldsList.splice(index, 1);
    }
  }

  deleteres(field: any): void {  // for deleting the options after adding in popup not impli
    console.log(field);
    const index = this.userlist.indexOf(field);
    if (index !== -1) {
      this.userlist.splice(index, 1);
    }
  }

  addButton(type: number) {
    if (type == 8) {
      const newSubmit: field = {
        indexs: this.indexs,
        isoptional: false,
        toolid: 8,
        names: [],
        fieldName: 'submit',
      };
      this.forms.fieldsList.push(newSubmit);
    } else if (type == 8) {
      const newReset: field = {
        indexs: this.indexs,
        isoptional: false,
        toolid: 8,
        names: [],
        fieldName: 'reset',
      };
      this.forms.fieldsList.push(newReset);
    }
  }

  addField(type: number): void {
    this.type = type;
    const dialogRef = this.dialog.open(FormPopupComponent, {
      width: '250px',
      data: { name: type }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (!res) return
      if (type === 1) {
        const newField: field = {
          indexs: this.indexs,
          isoptional: res.data1.isoptional,
          toolid: 1,
          names: res.data1.name,
          fieldName: res.data1.fieldName,
        };
        console.log(this.forms);

        this.forms.fieldsList.push(newField);
      } else if (type === 3) {
        const newradio: field = {
          fieldName: res.data1.fieldName,
          indexs: this.indexs,
          isoptional: res.data1.isoptional,
          toolid: 3,
          names: res.data1.name,
        };

        this.forms.fieldsList.push(newradio);
      } else if (type === 2) {
        const newcheck: field = {
          fieldName: res.data1.fieldName,
          indexs: this.indexs,
          isoptional: res.data1.isoptional,
          toolid: 2,
          names: res.data1.name,
        };

        this.forms.fieldsList.push(newcheck);
      } else if (type === 8) {
        const newbutton: field = {
          fieldName: res.data1.fieldName,
          indexs: this.indexs,
          isoptional: res.data1.isoptional,
          toolid: 8,
          names: res.data1.name,
        };

        this.forms.fieldsList.push(newbutton);
      } else if (type === 5) {
        const newDate: field = {
          fieldName: res.data1.fieldName,
          indexs: this.indexs,
          isoptional: res.data1.isoptional,
          toolid: 5,
          names: res.data1.name,
        };

        this.forms.fieldsList.push(newDate);
      }
    });

  }
}
