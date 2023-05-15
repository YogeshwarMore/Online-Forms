import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ServicesService } from '../services/services.service';
import { forms } from '../Model/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  forms:Array<forms>=[];

  constructor(private service:ServicesService){
   this.service.GetForms().subscribe(res=>
    {
      this.forms = res;
      
    });
  }
  ngOnInit(): void {
  }
  
}
