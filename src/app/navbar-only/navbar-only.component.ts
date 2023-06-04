import { Component } from '@angular/core';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-navbar-only',
  templateUrl: './navbar-only.component.html',
  styleUrls: ['./navbar-only.component.scss']
})
export class NavbarOnlyComponent {
  constructor(public service: ServicesService) { }

}
