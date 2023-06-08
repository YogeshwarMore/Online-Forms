import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { field } from '../model/field';

@Component({
  selector: 'app-form-popup',
  templateUrl: './form-popup.component.html',
  styleUrls: ['./form-popup.component.scss']
})

export class FormPopupComponent implements OnInit {

  type: any;
  Name: any;
  field: field = {
    fieldName: '',
    indexs: 0,
    isoptional: false,
    toolid: 0,
    names: []
  }
    ;
  isOptional: any = false;
  optionName: string = '';
  options: string[] = [];


  constructor(public dialogRef: MatDialogRef<FormPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.type = this.data.name;
    this.Name = this.data.field.fieldName;
    this.isOptional = this.data.field.isoptional;
    this.options = this.data.field.names;
  }
  remove(id: number) {
    this.options.splice(id, 1);
  }
  addOption(): void {
    this.options.push(this.optionName);
    this.optionName = '';
  }

  OnSave() {
    this.dialogRef.close({
      data1: { fieldName: this.Name, isoptional: this.isOptional, name: this.options, toolid: 0, indexs: 0 }
    });

  }

}

