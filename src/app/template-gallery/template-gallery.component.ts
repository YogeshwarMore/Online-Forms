import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-template-gallery',
  templateUrl: './template-gallery.component.html',
  styleUrls: ['./template-gallery.component.scss'],
  
})
export class TemplateGalleryComponent {
  constructor(private router: Router) {}

  navigateToExternalUrl(url: string) {
    window.location.href = url;
  }
  
  
  

}

