import { Injectable, NgZone } from '@angular/core';
import Swal from 'sweetalert2';

declare var gapi: any;
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private CLIENT_ID = "592088999303-njnsom6mvdcn0kpesi2ibtlhmblcfcda.apps.googleusercontent.com";
  private API_KEY = "AIzaSyAe4wCi-LL97X_H7fhfaYnB_0cPqfdYVNU";
  private DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
  private SCOPES = "https://www.googleapis.com/auth/calendar";

  private tokenClient: any;
  private gapiInited = false;
  private gisInited = false;

  constructor(private ngZone: NgZone) {
    this.loadGapi();
    this.loadGis();
  }

  private loadGapi() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => this.gapiLoaded();
    document.body.appendChild(script);
  }

  private loadGis() {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = () => this.gisLoaded();
    document.body.appendChild(script);
  }

  private gapiLoaded() {
    gapi.load('client', () => {
      this.ngZone.run(() => {
        this.initializeGapiClient();
      });
    });
  }

  private async initializeGapiClient() {
    await gapi.client.init({
      apiKey: this.API_KEY,
      discoveryDocs: [this.DISCOVERY_DOC],
    });
    this.gapiInited = true;
  }

  private gisLoaded() {
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: this.CLIENT_ID,
      scope: this.SCOPES,
      callback: '',
    });
    this.gisInited = true;
  }

  private reinitializeGapi() {
    gapi.client.init({
      apiKey: this.API_KEY,
      discoveryDocs: [this.DISCOVERY_DOC],
    }).then(() => {
      this.gapiInited = true;
    });
  }

  public createGoogleEvent(eventDetails: any) {
    if (!this.gapiInited || !this.gisInited) {
      console.error("GAPI or GIS not initialized");
      this.reinitializeGapi();
      return;
    }
    this.tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        console.error("Error during token request", resp.error);
        throw resp;
      }
      await this.scheduleEvent(eventDetails);
    };
    try {
      if (gapi.client.getToken() === null) {
        this.tokenClient.requestAccessToken({ prompt: "consent" });
      } else {
        this.tokenClient.requestAccessToken({ prompt: "" });
      }
    } catch (error) {
      console.error("Error requesting access token", error);
    }
    console.log('Token request initiated');
  }

  private async scheduleEvent(eventDetails: any) {
    const event = {
      summary: eventDetails.nameT,
      location: "",
      description: eventDetails.description,
      start: {
        dateTime: eventDetails.startTime,
        timeZone: "Asia/Jerusalem",
      },
      end: {
        dateTime: eventDetails.startTime,
        timeZone: "Asia/Jerusalem",
      },
      recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
      attendees: [{ email: eventDetails.email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };
    const request = gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });
    request.execute((event: any) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "המשימה נשמרה",
        html: `
        לצפיה בלוח המשימות
    <a href="${event.htmlLink}" target="_blank" autofocus>לחץ כאן</a> `,
        showConfirmButton: false,
        timer: 3000
      });
    });
  }
}