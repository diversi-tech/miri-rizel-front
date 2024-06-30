import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private gapiSetup: boolean = false;
  private authInstance: any;
  private user: any;

  constructor(private ngZone: NgZone) {}

  async initClient() {
    if (!this.gapiSetup) {
      await this.loadGapi();
      await this.initGapiClient();
      this.gapiSetup = true;
    }
  }

  private async loadGapi() {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = resolve;
      document.body.appendChild(script);
    });
  }

  private async initGapiClient() {
    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          apiKey: 'AIzaSyDLP4--v7uHS4lrfhUdcKMQqdyKMdF8fhM',
          clientId: '937305605192-tqch2vuavr4js08sbmumrp3i7rgdu1ud.apps.googleusercontent.com',
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
          scope: 'https://www.googleapis.com/auth/calendar'
        }).then(() => {
          this.authInstance = gapi.auth2.getAuthInstance();
          resolve(undefined);
        }).catch((error: any) => {
          reject(error);
        });
      });
    });
  }

  signIn(): Observable<any> {
    return new Observable((observer) => {
      this.authInstance.signIn().then((user: any) => {
        this.user = user;
        this.ngZone.run(() => observer.next(user));
      }).catch((error: any) => observer.error(error));
    });
  }

  signOut() {
    this.authInstance.signOut();
  }

  addEvent(event: any): Observable<any> {
    return new Observable((observer) => {
      gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event
      }).then((response: any) => {
        this.ngZone.run(() => observer.next(response));
      }).catch((error: any) => observer.error(error));
    });
  }
}
// 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
// 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