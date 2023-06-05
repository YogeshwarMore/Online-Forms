import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { forms } from '../model/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-template-gallery',
  templateUrl: './template-gallery.component.html',
  styleUrls: ['./template-gallery.component.scss'],

})
export class TemplateGalleryComponent {

  panelOpenState: boolean = false;
  forms: Array<forms> = [];
  constructor(private router: Router, private service: ServicesService, public navbar: NavbarComponent) {

    this.service.GetForms().subscribe(res => {
      this.forms = res;
    });
  }

  navigateToExternalUrl(url: string) {
    window.location.href = url;
  }

}

