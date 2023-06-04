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
  i: number = 0;
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
    private route: ActivatedRoute,
    private router: Router,
    private dataSharingService: DataService
  ) {
    const storedValue = localStorage.getItem("versionid");
    this.i = storedValue ? +storedValue : 0;
    console.log(this.i);
  }

  ngOnInit(): void {

    this.service.Gettool().subscribe((res) => {
      this.tools = res;
    });

    this.service.GetFormField(1, this.i).subscribe((res) => {
      console.log(res);
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

    this.role = this.service.getRoles();
    if (this.role !== 'admin') {
      this.router.navigate(['/']);
    }



    // this.route.queryParams.subscribe((params) => {

    //   if (params['data'] == undefined)
    //     return;
    //   const serializedData = params['data'];
    //   const serializedData2 = params['data2'];
    //   const data: forms = JSON.parse(serializedData);
    //   this.formid = data.formid;
    //   this.formname = data.formname;
    //   this.desc = data.description;
    //   this.version = JSON.parse(serializedData2).versionnumber;
    //   this.i = JSON.parse(serializedData2).versionid;
    //   console.log(this.i);

    // });

    this.service.getUserData(this.i).subscribe((res) => {

      this.userdata = res;

    });
    localStorage.setItem("versionid", this.i + "");
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
    this.formname = "";
    this.desc = "";
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


  sharelink() {
    const i = this.formid;
    const j = this.i;

    const textToCopy = `http://localhost:4200/fillform?i=${i}&j=${j}`;

    console.log(textToCopy);

    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);

    textarea.select();

    document.execCommand('copy');

    document.body.removeChild(textarea);


  }

}
