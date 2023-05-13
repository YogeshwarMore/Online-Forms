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
  isOptional: any;
  count: any;
  optionValue:String="";
  options: string[] = [];


  constructor( public dialogRef: MatDialogRef<FormPopupComponent>,@Inject(MAT_DIALOG_DATA)public data:any) { }
  ngOnInit(): void {
    this.type=this.data.name;
  }

    addOption(): void {
    this.options.push(this.Name);
    this.Name = '';
  }
 
  OnSave(){
    this.dialogRef.close({
      data1:{f:this.Name,l:this.isOptional,options: this.options}
    });
    
  }
 
}

