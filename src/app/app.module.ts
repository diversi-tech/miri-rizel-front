import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ActionCodeInfo } from '@angular/fire/auth';
import { AuthSettings } from '@angular/fire/auth';
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
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { NgxGoogleSignInModule } from 'ngx-google-sign-in';
import { RouterModule } from '@angular/router';
import { GoogleComponent } from './Components/google/google.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { LeadComponent } from './Components/Lead-components/lead/lead.component';
import { ListLeadsComponent } from './Components/Lead-components/list-leads/list-leads.component';
import { AddLeadComponent } from './Components/Lead-components/add-lead/add-lead.component';
import { CustomersComponent } from './Components/customers/customers.component';

@NgModule({
  declarations: [
    AppComponent,
    ResetPasswordComponent,
    DialogComponent,
    AuthCodeDialogComponent,
    LoginComponent,
    EditUserComponent,
    AddUserComponent,
    GoogleComponent, 
    SignUpComponent,
    LeadComponent,
    ListLeadsComponent,
    AddLeadComponent,
    CustomersComponent,
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
    SocialLoginModule,
  ],
  
  providers: [
    provideClientHydration(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
               '427515481723-ja7nlkmti3amubd5e5qbtdig27fc06ik.apps.googleusercontent.com'
            )
          },
         
        ],
        callback: 'initGoogleOneTap',
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
