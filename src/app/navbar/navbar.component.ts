import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ServicesService } from '../services/services.service';
import { forms } from '../Model/forms';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  forms:Array<forms>=[];
  versionid:  any={
    versionid:1,
    versionnumber:1};

  constructor(private service:ServicesService, private router: Router, private route: ActivatedRoute){
   this.service.GetForms().subscribe(res=>
    {
      this.forms = res;
      
    });
  }
  ngOnInit(): void {
    
  }
  getform(id:forms){
    this.versionid=id.versionsList?.reduce((max, version) => (version.versionid > max ? version.versionid : max), -Infinity);
    
 
    const serializedData = JSON.stringify(id);
  this.router.navigate(['/form'], { queryParams: { data: serializedData,data2: this.versionid } });
  }
  
}
