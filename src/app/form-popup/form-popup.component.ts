import { Component} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-form-popup',
  templateUrl: './form-popup.component.html',
  styleUrls: ['./form-popup.component.scss']
})
export class FormPopupComponent{

 
  Name:any;
  isOptional:any;
  constructor( public dialogRef: MatDialogRef<FormPopupComponent>) { }
 
  OnSave(){
    this.dialogRef.close({
      data:{f:this.Name,l:this.isOptional}
    });
    
  }
 
}

