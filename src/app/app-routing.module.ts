import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { TemplateGalleryComponent } from './template-gallery/template-gallery.component';
import { DummyComponent } from './dummy/dummy.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormComponent } from './form/form.component';
import { FillFormComponent } from './fill-form/fill-form.component';
import { UserDataComponent } from './user-data/user-data.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { DynamicFormComponent } from './all-user-data/all-user-data.component';
import { UserLoginComponent } from './user-login/user-login.component';

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
  { path: '**', redirectTo: '', pathMatch: 'full', component: LoginComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
