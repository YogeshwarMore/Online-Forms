import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import { MatToolbarModule} from '@angular/material/toolbar'
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconButton} from '@angular/material/button'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { DummyComponent } from './dummy/dummy.component';
import { TemplateGalleryComponent } from './template-gallery/template-gallery.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import { FormComponent } from './form/form.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import { FormPopupComponent } from './form-popup/form-popup.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NavbarOnlyComponent } from './navbar-only/navbar-only.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DummyComponent,
    TemplateGalleryComponent,
    FeedbackPageComponent,
    FormComponent,
    FormPopupComponent,
    NavbarOnlyComponent,
    
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
    FormsModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
