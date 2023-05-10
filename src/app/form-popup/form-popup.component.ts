import { Component,Inject } from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  firstName: string;
  lastName: string;
 }

@Component({
  selector: 'app-form-popup',
  templateUrl: './form-popup.component.html',
  styleUrls: ['./form-popup.component.scss']
})
export class FormPopupComponent {

  firstName: string = '';
  lastName: string = '';
 
  constructor(
  public dialogRef: MatDialogRef<FormPopupComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
 
  onNoClick(): void {
  this.dialogRef.close();
  }

}

