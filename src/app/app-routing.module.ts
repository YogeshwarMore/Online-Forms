import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { TemplateGalleryComponent } from './template-gallery/template-gallery.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormComponent } from './form/form.component';
import { FillFormComponent } from './fill-form/fill-form.component';
import { UserDataComponent } from './user-data/user-data.component';
import { LoginComponent } from './login/login.component';
import { DynamicFormComponent } from './all-user-data/all-user-data.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AlreadySubmittedComponent } from './already-submitted/already-submitted.component';
import { SubmissionClosedComponent } from './submission-closed/submission-closed.component';
import { AllFormsComponent } from './all-forms/all-forms.component';

const routes: Routes = [
  { path: 'template-gallery', component: TemplateGalleryComponent },
  { path: 'alluserdata', component: DynamicFormComponent },
  { path: 'home', component: NavbarComponent },
  { path: 'feedback', component: FeedbackPageComponent },
  { path: 'editresponse', component: FillFormComponent },
  { path: 'form', component: FormComponent },
  { path: 'fillform', component: FillFormComponent },
  { path: 'userdata', component: UserDataComponent },
  { path: 'userlogin', component: UserLoginComponent },
  { path: 'already-submitted', component: AlreadySubmittedComponent },
  { path: 'submission-closed', component: SubmissionClosedComponent },
  { path: 'all-forms', component: AllFormsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full', component: LoginComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
