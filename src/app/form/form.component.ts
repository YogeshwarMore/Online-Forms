import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormPopupComponent } from '../form-popup/form-popup.component';
import { forms } from '../model/forms';
import { ServicesService } from '../services/services.service';
import { field } from '../model/field';
import { user } from '../Model/User';
import { data } from '../model/formfilleddata';
import { DataService } from '../services/data-service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { style } from '@angular/animations';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  styles: [`.error-snackbar { color: red; }`],
})
export class FormComponent implements OnInit {
  formname: string = '';
  desc: string = '';
  version: number = 0;
  formid: any = null;
  type: any;
  indexs: number = 0;
  field!: field[];
  i: number = 0;
  toggleValue: boolean = localStorage.getItem("flag") == "1" ? true : false;
  userdata: data[] = [
    {
      user: {
        userid: 0,
        userfirstname: "",
        userlastname: "",
        useremailid: "",
        username: "",
        userpassword: ""
      },
      filldate: "",
      details: [{
        fieldname: "",
        value: ""
      }]
    }
  ];

  savebtn: boolean = localStorage.getItem("savebtndis") ? false : true;

  forms: forms = {
    formname: '',
    description: '',
    versionnumber: 0,
    fieldsList: [],
  };
  role!: string | null;


  constructor(
    public dialog: MatDialog,
    public service: ServicesService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const storedValue = localStorage.getItem("versionid");
    this.i = storedValue ? +storedValue : 0;
  }


  onToggleChange() {
    this.service.updateFormrecived(this.toggleValue, this.formid);
    localStorage.removeItem("flag");
    localStorage.setItem("flag", this.toggleValue == true ? "1" : "0")
  }

  ngOnInit(): void {

    this.role = this.service.getRoles();
    if (this.role !== 'admin') {
      this.router.navigate(['/']);
    }

    if (this.i > 0) {

      this.service.GetFormField(this.i, this.i).subscribe((res) => {
        this.field = res;
        this.forms.fieldsList = this.field;

      });

      this.formid = localStorage.getItem("formid");
      const formname = localStorage.getItem("formname");
      this.formname = formname ? formname : "";
      const desc = localStorage.getItem("formdesc");
      this.desc = desc ? desc : "";
      const vnum = localStorage.getItem("versionnumber");
      this.version = vnum ? +vnum : 0;



      this.service.getUserData(this.i).subscribe((res) => {
        this.userdata = res;
      });

    }
  }

  drop(event: CdkDragDrop<field[]>): void {
    moveItemInArray(this.forms.fieldsList, event.previousIndex, event.currentIndex);
  }

  loadFields(): void {
    this.forms.formid = this.formid;
    this.forms.formname = this.formname;
    this.forms.description = this.desc;
    this.forms.versionnumber = this.version;
    this.forms.fieldsList = this.forms.fieldsList;
  }

  saveForms(): void {
    this.loadFields();

    if (!this.forms.formname || !this.forms.description) {
      const textField = document.getElementById('formname') as HTMLInputElement;
      const textField1 = document.getElementById('description') as HTMLInputElement;
      textField.classList.add('shake');
      textField1.classList.add('shake');
      setTimeout(() => {
        textField.classList.remove('shake');
        textField1.classList.remove('shake');
      }, 400);

      this.snackBar.open('Insert Form Name or Desc', 'Error', {
        duration: 1000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    if (this.forms.fieldsList.length === 0) {

      this.snackBar.open('No Field Added', 'Error', {
        duration: 1000,
        panelClass: ['error-snackbar']
      });
      return;
    }
    let indx = 1;
    for (let field of this.forms.fieldsList) {
      if (field.fieldName == null) {
        this.snackBar.open("field name is null", 'Error', {
          duration: 1000,
          panelClass: ['error-snackbar']
        });
        return;
      }
      field.indexs = indx;
      indx++;
    }
    this.forms.versionnumber = this.version + 1;
    this.service.saveForms(this.forms, this.forms.fieldsList);
    this.forms =
    {
      formname: '',
      description: '',
      versionnumber: 0,
      fieldsList: [],
    }
    this.formname = "";
    this.desc = "";
    this.service.formdataclear();
    this.snackBar.open('Your response is submitted', 'Success', {
      duration: 1000,
      panelClass: ['success-snackbar']
    });
  }

  editField(field: field, type: number): void {
    if (field.toolid !== null && field.toolid !== undefined)
      type = field.toolid;
    const dialogRef = this.dialog.open(FormPopupComponent, {
      width: '250px',
      data: { name: type, field: field }
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
  deleteUser(userid: data) {
    this.service.deleteUser(userid.user.userid, this.i);

  }

  userdataa(field: data) {
    const jsonData = JSON.stringify(field);
    this.router.navigate(['/userdata'], { queryParams: { data: jsonData } });
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


  sharelink() {

    const i = this.formid;
    const j = this.i;

    const textToCopy = `http://localhost:4200/fillform?i=${i}&j=${j}`;


    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((error) => {
        console.error('Unable to copy text to clipboard:', error);
      });


  }

}



