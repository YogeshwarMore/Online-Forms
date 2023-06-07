import { Component } from '@angular/core';
import { forms } from '../model/forms';
import { ServicesService } from '../services/services.service';
import { Router } from '@angular/router';
import { version } from '../model/versions';
@Component({
  selector: 'app-all-forms',
  templateUrl: './all-forms.component.html',
  styleUrls: ['./all-forms.component.scss']

})
export class AllFormsComponent {
  panelOpenState: boolean = false;
  forms: Array<forms> = [];
  role: string | null;

  constructor(public service: ServicesService, private router: Router) {
    this.service.GetForms().subscribe(res => {
      this.forms = res;
      console.log(res, this.forms);
    });
    this.role = this.service.getRoles();
    if (this.role !== 'admin') {
      this.router.navigate(['/']);
    }
  }


  getform(id: forms, version: version) {




    const versionid = version.versionid ? version.versionid : 0;
    this.service.addformdata(id.formid + "", versionid + "", id.formname, id.description, version.versionnumber + "")

    localStorage.setItem("savebtndis", "false");
    localStorage.setItem("flag", id.flag + "");


    if (this.role == 'admin')
      this.router.navigate(['/form']);
  }

}
