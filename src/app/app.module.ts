import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconButton } from '@angular/material/button'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { TemplateGalleryComponent } from './template-gallery/template-gallery.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import { FormComponent } from './form/form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { FormPopupComponent } from './form-popup/form-popup.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NavbarOnlyComponent } from './navbar-only/navbar-only.component';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormComponent } from './all-user-data/all-user-data.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { FillFormComponent } from './fill-form/fill-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDataComponent } from './user-data/user-data.component';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';
import { LoginComponent } from './login/login.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { SubmissionClosedComponent } from './submission-closed/submission-closed.component';
import { AlreadySubmittedComponent } from './already-submitted/already-submitted.component';
import { AllFormsComponent } from './all-forms/all-forms.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TemplateGalleryComponent,
    FeedbackPageComponent,
    FormComponent,
    FormPopupComponent,
    NavbarOnlyComponent,
    DynamicFormComponent,
    FillFormComponent,
    UserDataComponent,
    LoginComponent,
    UserLoginComponent,
    SubmissionClosedComponent,
    AlreadySubmittedComponent,
    AllFormsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSidenavModule,
    FlexLayoutModule,
    RouterModule,
    MatTabsModule,
    MatListModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    DragDropModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    NgxUiLoaderModule.forRoot({

      "bgsColor": "#673ab7",

      "bgsOpacity": 0.5,

      "bgsPosition": "bottom-right",

      "bgsSize": 90,

      "bgsType": "three-strings",

      "blur": 15,

      "delay": 0,

      "fastFadeOut": true,

      "fgsColor": "#673ab7",

      "fgsPosition": "center-center",

      "fgsSize": 90,

      "fgsType": "three-strings",

      "gap": 24,

      "logoPosition": "center-center",

      "logoSize": 120,

      "logoUrl": "",

      "masterLoaderId": "master",

      "overlayBorderRadius": "0",

      "overlayColor": "rgba(255,255,255,0.94)",

      "pbColor": "#673ab7",

      "pbDirection": "ltr",

      "pbThickness": 3,

      "hasProgressBar": true,

      "text": "",

      "textColor": "red",

      "textPosition": "center-center",
    }),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true })
  ],

  exports: [RouterModule],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '558684210677-dqdfsgrnp6017mvk68eantctc9o6bqpt.apps.googleusercontent.com'
          )
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
