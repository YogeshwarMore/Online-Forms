import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { TemplateGalleryComponent } from './template-gallery/template-gallery.component';
import { DummyComponent } from './dummy/dummy.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';

const routes: Routes = [
  { path: 'template-gallery', component: TemplateGalleryComponent },
  { path: 'dummy', component: DummyComponent },
  { path: 'feedback', component: FeedbackPageComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' },
 
  // other routes
];
 



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
