import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private service: ServicesService) { }

  canActivate(): boolean {

    if (this.service.getRoles() == 'admin') {
      this.router.navigate(['/home']);
      return true;
    }
    if (this.service.getRoles() == 'user') {
      this.router.navigate(['/fillform']);
      return true;
    }
    this.router.navigate(['/jk']);
    return true;
  }
}
