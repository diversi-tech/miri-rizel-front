import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';

import { MatDialogModule } from '@angular/material/dialog';

// import { MatDividerModule } from '@angular/material/driver';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './components/dialog/dialog.component';
import { AuthCodeDialogComponent } from './components/auth-code-dialog/auth-code-dialog.component';
import { LoginComponent } from './components/login/login.component';
// import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxGoogleSignInModule } from 'ngx-google-sign-in';
import { RouterModule } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { ViewTasksAndProjectsComponent } from './view-tasks-and-projects/view-tasks-and-projects.component';

@NgModule({
  declarations: [
    AppComponent,
    ResetPasswordComponent,
    DialogComponent,
    AuthCodeDialogComponent,
    LoginComponent,
    EditUserComponent,
    ProjectComponent,
    ViewTasksAndProjectsComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    // MatDividerModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
