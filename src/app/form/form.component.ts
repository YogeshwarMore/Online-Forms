import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormPopupComponent } from '../form-popup/form-popup.component';

interface Field {
  name: string;
  isOptional: Boolean;
}


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
   
  title='dropzone';
  constructor(private dialogRef:MatDialog){  }
  fields: Field[] = [];

  test: Field= {name :"",isOptional:false};
  

  addField() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

  //   dialogConfig.data = {
  //     name: 1,
  //     isOptional: true
  // };
    const dialogRef= this.dialogRef.open(FormPopupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(

    data =>{
          this.test.name=data.name;
          this.test.isOptional=false;
          this.fields.push(this.test);
     } );
    
}

}

interface Field {
  name: string;
  isOptional: Boolean;
}
