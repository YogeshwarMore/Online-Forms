import { Component } from '@angular/core';
import { forms } from '../model/forms';
import { ServicesService } from '../services/services.service';
import { Router } from '@angular/router';
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


  getform(id: forms) {

    console.log("woking", id);

    const highestVersion = id.versionsList?.reduce((maxVersion, version) => {
      return version.versionNumber > maxVersion.versionNumber ? maxVersion : version;
    });


    this.service.addformdata(id.formid + "", highestVersion.versionid, id.formname, id.description, highestVersion.versionnumber)

    localStorage.setItem("savebtndis", "false");
    localStorage.setItem("formid", id.formid + "");
    localStorage.setItem("versionid", highestVersion.versionid);
    localStorage.setItem("flag", id.flag + "");


    if (this.role == 'admin')
      this.router.navigate(['/form']);
  }

}
