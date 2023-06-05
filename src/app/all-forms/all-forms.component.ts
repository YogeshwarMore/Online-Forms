import { Component } from '@angular/core';
import { forms } from '../model/forms';
import { ServicesService } from '../services/services.service';
@Component({
  selector: 'app-all-forms',
  templateUrl: './all-forms.component.html',
  styleUrls: ['./all-forms.component.scss']

})
export class AllFormsComponent {
  panelOpenState: boolean = false;
  forms: Array<forms> = [];

  constructor(public service: ServicesService) {
    this.service.GetForms().subscribe(res => {
      this.forms = res;
      console.log(res, this.forms);
    });
  }
}
