import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';

import { MatDialogModule } from '@angular/material/dialog';

// import { MatDividerModule } from '@angular/material/driver';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './Components/dialog/dialog.component';
import { AuthCodeDialogComponent } from './Components/auth-code-dialog/auth-code-dialog.component';
import { LoginComponent } from './Components/login/login.component';
// import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import { EditUserComponent } from './Components/edit-user/edit-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxGoogleSignInModule } from 'ngx-google-sign-in';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { TaskBoardComponent } from './Components/task-board/task-board.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AddTaskComponent } from './Components/add-task/add-task.component';
import { DropdownModule } from 'primeng/dropdown';

import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    ResetPasswordComponent,
    DialogComponent,
    AuthCodeDialogComponent,
    LoginComponent,
    EditUserComponent,
    AddUserComponent,
    SignUpComponent,
    TaskBoardComponent,
    AddTaskComponent,
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
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    FormsModule,
    AutoCompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatAutocompleteModule,
    DropdownModule  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}