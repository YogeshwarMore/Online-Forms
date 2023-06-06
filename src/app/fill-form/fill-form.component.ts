import { Component, OnInit } from '@angular/core';
import { forms } from '../model/forms';
import { ServicesService } from '../services/services.service';
import { field } from '../model/field';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filledform } from '../model/filledform';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';




interface demo {
  id: number,
  value?: string,
  name: string,
  fieldid: number,
  optionid?: number,
  isoptional: boolean
}
@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss']
})
export class FillFormComponent implements OnInit {
  names: string[] = [];
  demo: demo[] = [];
  form!: FormGroup;
  field!: field[];
  i: number = 0;
  j: number = 0;

  option!: string;
  filledform: filledform[] = [];

  forms: forms = {
    formname: '',
    description: '',
    versionnumber: 0,
    fieldsList: [],
  };


  constructor(public service: ServicesService, private snackBar: MatSnackBar, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) { this.form = this.formBuilder.group({}); }
  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      this.i = params['i'];
      this.j = params['j'];
    });

    this.service.getUserData(this.j).subscribe((res) => {
      const i = localStorage.getItem("userid");
      const j = i ? +i : 0;
      res.forEach(user => user.user.userid == j ? window.location.replace('/already-submitted') : 0);
    });

    if (this.service.getRoles() !== 'user' && this.service.getRoles() !== 'admin') {

      localStorage.setItem('versionid', this.j + "");
      localStorage.setItem('formid', this.i + "");
      this.router.navigate(['userlogin']);
    }

    this.service.GetFormField(this.i, this.j).subscribe(res => {
      this.field = res;
      this.forms.fieldsList = this.field;
    })
    this.service.getFormDetails(this.i).subscribe(res => {
      this.forms.formname = res.formname;
      this.forms.description = res.description;

      if (res.flag == 0) {
        window.location.replace('/submission-closed');
      }
    })



  }

  valuestore(field: field, i: number) {
    const index = this.demo.findIndex(d => d.id === i);
    if (index !== -1) {
      this.demo[index].value = this.names[i];
    } else {
      const newDemo: demo = {
        id: i,
        value: this.names[i],
        name: field.fieldName,
        fieldid: field.formfieldid ?? 0,
        isoptional: field.isoptional
      };
      this.demo.push(newDemo);
    }

  }

  updateCheckedOptions(option: string, field: field, i: number) {
    const index = this.demo.findIndex(d => d.value === option);
    if (field.toolid == 3)
      this.demo = this.demo.filter(demoItem => demoItem.fieldid !== field.formfieldid);

    if (index !== -1) {
      this.demo.splice(index, 1);

    } else {

      const newDemo: demo = {
        id: i,
        name: field.fieldName,
        value: option,
        fieldid: field.formfieldid ?? 0,
        optionid: 0,
        isoptional: field.isoptional
      };
      this.service.getOptionId(option).subscribe(
        (optionId: number) => {
          newDemo.optionid = optionId;
          this.demo.push(newDemo);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  check(id: any) {
    if (id !== null && id !== undefined)
      return 1;
    else
      return 0;
  }

  submitForm() {

    for (const data of this.demo) {

      const filledField: filledform = {
        formfieldid: data.fieldid,
        ischecked: this.check(data.optionid),
        textvalue: data.value ?? null,
        numericvalue: null,
        datetimevalue: null,
        optionid: data.optionid ?? null
      };

      this.filledform.push(filledField);
    }


    for (const field of this.forms.fieldsList) {

      if (field.isoptional === true)
        if (this.demo.filter(d => d.fieldid == field.formfieldid).length == 0) {
          this.snackBar.open("fill required fields", "", {
            duration: 1000,
          });
          this.filledform = [];
          return
        }
    }
    const user = localStorage.getItem("userid");

    this.service.saveFilledData(this.j, user ? +user : 0, this.filledform);

  }

}
