import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ServicesService } from '../services/services.service';
import { forms } from '../model/forms';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private service: ServicesService, private router: Router, private route: ActivatedRoute) {
    this.service.GetForms().subscribe(res => {
      this.forms = res;

    });
  }

  getform(id: forms) {
    const highestVersion = id.versionsList?.reduce((maxVersion, version) => {
      return version.versionNumber > maxVersion.versionNumber ? version : maxVersion;
    });
    const serializedData = JSON.stringify(id);
    const serializedData2 = JSON.stringify(highestVersion);
    this.router.navigate(['/form'], { queryParams: { data: serializedData, data2: serializedData2 } });
    console.log(id);
  }

}
