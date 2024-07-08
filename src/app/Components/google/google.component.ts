import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '@app/Model/User';
declare global {
  interface Window {
    google: any;
  }
}
import { UserService } from '@app/Services/user.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Password } from 'primeng/password';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})

@Injectable()
export class GoogleComponent {

  constructor(private dialog: MatDialog,
    private router: Router,private login: UserService) { }

  initGoogleOneTap(): void {
    if (window.google.accounts.id) {
      window.google.accounts.id.initialize({
        client_id: '427515481723-ja7nlkmti3amubd5e5qbtdig27fc06ik.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this)
      });
      window.google.accounts.id.prompt();
    } else {
      console.error("Google accounts.id API not loaded.");
    }
  }

  handleCredentialResponse(response: any): void {
    if (response.credential) {
      var idToken = response.credential;
      var decodedToken = this.parseJwt(idToken);
      var email = decodedToken.email;
      var userName = decodedToken.name;
      console.log(userName);
      console.log(email);
      this.login.loginGoogle(email,userName).subscribe(
        (user: User) => {
          console.log("user");
          if (user.role == 1) {
            this.router.navigate(['/admin']);
          }
          if (user.role == 2) {
            this.router.navigate(['/worker']);
          }
          if (user.role == 3) {
            this.router.navigate(['/customer']);
          }
        },
        error => {
          this.dialog.open(DialogComponent, {
            data: {
              title: 'שגיאה',
              context: 'ארעה תקלה במהלך ההתחברות, נסה שנית',
              buttonText: 'סגור',
            },
          });
        }
      );}}

  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

}