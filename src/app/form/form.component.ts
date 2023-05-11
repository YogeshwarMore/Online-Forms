import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormPopupComponent } from '../form-popup/form-popup.component';
import { NavbarOnlyComponent } from '../navbar-only/navbar-only.component';

interface Field {
  name: string;
  isOptional: Boolean;
}


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  viewProviders: [ NavbarOnlyComponent ]
})
export class FormComponent {
  userlist = [
    { id: 1, name: 'John Doe', formResponse: 'Response1' },
    { id: 2, name: 'Jane Smith', formResponse: 'Response2' },
    { id: 3, name: 'Bob Johnson', formResponse: 'Response3' },
    { id: 4, name: 'Kate Johnson', formResponse: 'Response3' },
    { id: 5, name: 'Helmon peters', formResponse: 'Response3' },
    { id: 6, name: 'Mary Dcousta', formResponse: 'Response3' }
  ];
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
