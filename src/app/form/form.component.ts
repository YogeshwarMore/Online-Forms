import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { FormPopupComponent } from '../form-popup/form-popup.component';
import { forms } from '../Model/forms';
import { ServicesService } from '../services/services.service';
import { field } from '../Model/field';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  formname: string = '';
  desc: string = '';
  version: number = 1;
  tools: any;
  type: any;
  field!: field[];

  userlist = [
    { id: 1, name: 'John Doe', formResponse: 'Response1' },
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
  ) {}

  ngOnInit(): void {
    this.service.Gettool().subscribe((res) => {
      this.tools = res;
    });

    this.route.queryParams.subscribe((params) => {
      if (params['data'] === undefined) {
        return;
      }

      const serializedData = params['data'];
      const data: forms = JSON.parse(serializedData);

      this.formname = data.formname;
      this.desc = data.formname;
      this.version = data.versionnumber + 1;

      this.service.GetFormField(1, params['data2']).subscribe((res) => {
        this.field = res;
        this.forms.fieldsList = this.field;
      });
    });
  }

  drop(event: CdkDragDrop<field[]>): void {
    moveItemInArray(this.forms.fieldsList, event.previousIndex, event.currentIndex);
  }

  loadFields(): void {
    this.forms.formname = this.formname;
    this.forms.description = this.desc;
    this.forms.versionnumber = this.version;
  }

  saveForms(): void {
    this.loadFields();

    if (!this.forms.formname || !this.forms.description) {
      console.log('Please provide a form name and description.');
      return;
    }

    if (this.forms.fieldsList.length === 0) {
      console.log('Please add at least one field to the form.');
      return;
    }

    this.service.saveForms(this.forms, 1);
  }

  editField(field: field): void {
    const dialogRef = this.dialog.open(FormPopupComponent, {
      width: '250px',
      data: { name: this.type, fieldName: field.fieldName, isoptional: field.isoptional }
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

  addField(type: string): void {
    this.type = type;
    const dialogRef = this.dialog.open(FormPopupComponent, {
      width: '250px',
      data: { name: type },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (type === 'text') {
        const newField: field = {
          indexs: 1,
          isoptional: res.data1.isoptional,
          toolid: 1,
          names: res.data1.name,
          fieldName: res.data1.fieldName,
        };

        this.forms.fieldsList.push(newField);
      } else if (type === 'radio') {
        const newradio: field = {
          fieldName: res.data1.fieldName,
          indexs: 3,
          isoptional: res.data1.isoptional,
          toolid: 3,
          names: res.data1.name,
        };

        this.forms.fieldsList.push(newradio);
      } else if (type === 'checkbox') {
        const newcheck: field = {
          fieldName: res.data1.fieldName,
          indexs: 1,
          isoptional: res.data1.isoptional,
          toolid: 2,
          names: res.data1.name,
        };

        this.forms.fieldsList.push(newcheck);
      } else if (type === 'button') {
        const newbutton: field = {
          fieldName: res.data1.fieldName,
          indexs: 1,
          isoptional: res.data1.isoptional,
          toolid: 8,
          names: res.data1.name,
        };

        this.forms.fieldsList.push(newbutton);
      } else if (type === 'DateTime') {
        const newDate: field = {
          fieldName: res.data1.fieldName,
          indexs: 1,
          isoptional: res.data1.isoptional,
          toolid: 5,
          names: res.data1.name,
        };

        this.forms.fieldsList.push(newDate);
      }
    });
  }
}
