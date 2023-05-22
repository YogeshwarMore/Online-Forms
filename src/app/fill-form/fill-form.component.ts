import { Component, OnInit } from '@angular/core';
import { forms } from '../model/forms';
import { ServicesService } from '../services/services.service';
import { field } from '../model/field';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filledform } from '../model/filledform';
import { from } from 'rxjs';


interface demo {
  id: number,
  value?: string,
  name: string,
  fieldid: number,
  optionid?: number
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
  option!: string;
  filledform: filledform[] = [];

  forms: forms = {
    formname: '',
    description: '',
    versionnumber: 0,
    fieldsList: [],
  };

  constructor(public service: ServicesService, private formBuilder: FormBuilder) { this.form = this.formBuilder.group({}); }
  ngOnInit(): void {

    this.service.GetFormField(1, 2).subscribe(res => {
      this.field = res;
      console.log(res, this.field);
      this.forms.fieldsList = this.field;
    })
    console.log(this.field);
  }

  valuestore(field: field, i: number) {
    const index = this.demo.findIndex(d => d.id === i);
    console.log(this.names[i])
    if (index !== -1) {
      this.demo[index].value = this.names[i];
    } else {
      const newDemo: demo = {
        id: i,
        value: this.names[i],
        name: field.fieldName,
        fieldid: field.formfieldid ?? 0
      };
      this.demo.push(newDemo);
    }

    console.log(this.names[i]);
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
        optionid: 0
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

    // this.demo = Object.values(
    //   this.demo.reduce((result, demoItem) => {
    //     if (!result[demoItem.fieldid]) {
    //       result[demoItem.fieldid] = { ...demoItem };
    //     } else {
    //       result[demoItem.fieldid].value += `, ${demoItem.value || ''}`;
    //     }
    //     return result;
    //   }, {} as { [key: number]: demo })
    // );

    console.log(this.demo);

    for (const data of this.demo) {

      const filledField: filledform = {
        formfieldid: data.fieldid,
        ischecked: this.check(data.optionid),
        textvalue: data.value ?? null,
        numericvalue: null, // Set numeric value if applicable
        datetimevalue: null, // Set datetime value if applicable
        optionid: data.optionid ?? null // Set option id if applicable
      };
      this.filledform.push(filledField);

    }
    console.log(this.filledform);
    this.service.saveFilledData(1, 1, this.filledform);

  }

}
