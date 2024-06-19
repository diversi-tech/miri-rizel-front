import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import { HttpClientModule } from '@angular/common/http';
import { EditUserComponent } from './Components/edit-user/edit-user.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NgxGoogleSignInModule } from 'ngx-google-sign-in';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
