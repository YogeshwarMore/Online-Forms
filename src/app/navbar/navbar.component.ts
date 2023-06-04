import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ServicesService } from '../services/services.service';
import { forms } from '../model/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  forms: Array<forms> = [];
  versionid: any = {
    versionid: 1,
    versionnumber: 1
  };
  role: string | null = '';

  constructor(public service: ServicesService, private router: Router) {
    this.service.formdataclear();

    this.service.GetForms().subscribe(res => {
      this.forms = res;
    });

    this.role = this.service.getRoles();
    if (this.role !== 'admin') {
      this.router.navigate(['/']);
    }

  }

  filteredForms: any[] = [];
  searchText: string = '';

  filterForms() {
    this.filteredForms = this.forms.filter(form => {
      const searchTerm = this.searchText.toLowerCase();
      const formName = form.formname.toLowerCase();

      return formName.includes(searchTerm);
    });
  }


  getform(id: forms) {

    const highestVersion = id.versionsList?.reduce((maxVersion, version) => {
      return version.versionNumber > maxVersion.versionNumber ? maxVersion : version;
    });


    this.service.addformdata(id.formid + "", highestVersion.versionid, id.formname, id.description, highestVersion.versionnumber)

    localStorage.setItem("formid", id.formid + "");
    localStorage.setItem("versionid", highestVersion.versionid);


    if (this.role == 'admin')
      this.router.navigate(['/form']);
  }

}
