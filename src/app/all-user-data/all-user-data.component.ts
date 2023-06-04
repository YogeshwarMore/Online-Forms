import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { DataService } from '../services/data-service';
import { forms } from '../model/forms';
import { data } from '../model/formfilleddata';
import { field } from '../model/field';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './all-user-data.component.html',
  styleUrls: ['./all-user-data.component.scss']
})
export class DynamicFormComponent {

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
  formid: any;
  formname: any;
  desc: any;
  version: any;
  i: any;
  field: field[] | undefined;

  constructor(
    public dialog: MatDialog,
    public service: ServicesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.formid = localStorage.getItem("formid");
    const formname = localStorage.getItem("formname");
    this.formname = formname ? formname : "";
    const desc = localStorage.getItem("formdesc");
    this.desc = desc ? desc : "";
    const vnum = localStorage.getItem("versionnumber");
    this.version = vnum ? +vnum : 0;
    const storedValue = localStorage.getItem("versionid");
    this.i = storedValue ? +storedValue : 0;

    this.service.GetFormField(this.formid, this.i).subscribe((res) => {
      this.field = res;
      this.forms.fieldsList = this.field;
    });

    this.role = this.service.getRoles();
    if (this.role !== 'admin') {
      this.router.navigate(['/']);
    }

    this.service.getUserData(this.i).subscribe((res) => {
      this.userdata = res;
    });

  }

  getFieldNames(): string[] {
    const fieldNames: string[] = [];
    for (const item of this.userdata) {
      for (const detail of item.details) {
        if (!fieldNames.includes(detail.fieldname)) {
          fieldNames.push(detail.fieldname);
        }
      }
    }
    return fieldNames;
  }

  getFieldValue(item: data, fieldName: string): string {
    const values: string[] = [];
    for (const detail of item.details) {
      if (detail.fieldname === fieldName) {
        values.push(detail.value);
      }
    }
    return values.join(', '); // Concatenate the values with a comma and space
  }

  exportToExcel(): void {

    import("xlsx").then((xlsx) => {

      const worksheet = xlsx.utils.table_to_sheet(document.querySelector("table"));

      const workbook = xlsx.utils.book_new();

      xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      xlsx.writeFile(workbook, "data.xlsx");

    });

  }
}
