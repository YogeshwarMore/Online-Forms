import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { TemplateGalleryComponent } from './template-gallery/template-gallery.component';
import { DummyComponent } from './dummy/dummy.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormComponent } from './form/form.component';
import { FillFormComponent } from './fill-form/fill-form.component';
import { UserDataComponent } from './user-data/user-data.component';

const routes: Routes = [
  { path: 'template-gallery', component: TemplateGalleryComponent },
  { path: 'dummy', component: DummyComponent },
  { path: 'edit-response', component: NavbarComponent },
  { path: 'feedback', component: FeedbackPageComponent },
  { path: 'editresponse', component: FillFormComponent },
  { path: 'form', component: FormComponent },
  { path: 'fillform', component: FillFormComponent },
  { path: 'userdata', component: UserDataComponent },
  { path: '**', redirectTo: '', pathMatch: 'full', component: NavbarComponent }



  // other routes
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
