import { Component, Injectable, OnInit } from '@angular/core';
declare global {
  interface Window {
    google: any;
  }
}
import { UserService } from '@app/Services/UserService';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})

@Injectable()
export class GoogleComponent {

  constructor(private login: UserService) { }

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
      this.login.login(userName, email);
    } else {
      alert('Google Sign-In was cancelled.');
    }
  }

  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

}