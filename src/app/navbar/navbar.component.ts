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

  constructor(private service: ServicesService, private router: Router, private route: ActivatedRoute, private emitdata: DataService) {
    this.service.formdataclear();
    this.service.GetForms().subscribe(res => {
      this.forms = res;

    });
    this.role = this.service.getRoles();
    if (this.role !== 'admin') {
      console.log("i am the culprit");
      this.router.navigate(['/']);
    }
    this.emitdata.setSharedData("");
  }

  getform(id: forms) {

    const highestVersion = id.versionsList?.reduce((maxVersion, version) => {
      return version.versionNumber > maxVersion.versionNumber ? version : maxVersion;
    });

    // const data = {
    //   d1: id,
    //   d2: highestVersion
    // }
    this.service.addformdata(id.formid + "", highestVersion.versionid, id.formname, id.description, highestVersion.versionnumber)

    // this.emitdata.setSharedData(data);

    localStorage.setItem("formid", id.formid + "");
    localStorage.setItem("versionid", highestVersion.versionid);


    if (this.role == 'admin')
      this.router.navigate(['/form']);
    // const serializedData = JSON.stringify(id);
    // const serializedData2 = JSON.stringify(highestVersion);
    // this.router.navigate(['/form'], { queryParams: { data: serializedData, data2: serializedData2 } });
    // console.log(id);
  }

}
