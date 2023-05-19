import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-popup',
  templateUrl: './form-popup.component.html',
  styleUrls: ['./form-popup.component.scss']
})

export class FormPopupComponent implements OnInit{

  type: any;
  Name: any;
  isOptional: any=false;
  optionName:any;
  options: string[] =[];


  constructor( public dialogRef: MatDialogRef<FormPopupComponent>,@Inject(MAT_DIALOG_DATA)public data:any) { }
  ngOnInit(): void {
    this.type=this.data.name;
    console.log(this.type,this.data.name);
  }

    addOption(): void {
    this.options.push(this.optionName);
    this.optionName = '';
  }
 
  OnSave(){
    this.dialogRef.close({
      data1:{fieldName:this.Name,isoptional:this.isOptional,name: this.options,toolid:0,indexs:0}
    });
    
  }
 
}

