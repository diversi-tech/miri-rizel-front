import { Injectable, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/enviroments/environment';
import Swal from 'sweetalert2';
import { TaskService } from '@app/Services/task.service';

declare var gapi: any;
declare var google: any;

@Injectable({
  providedIn: 'root'
})

export class GoogleAuthService {

  private CLIENT_ID = environment.CLIENT_ID;
  private API_KEY = environment.API_KEY;
  private DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
  private SCOPES = "https://www.googleapis.com/auth/calendar";
  private tokenClient: any;
  private gapiInited = false;
  private gisInited = false;

  constructor(private ngZone: NgZone, private taskService: TaskService, private translate: TranslateService) {
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

  public createGoogleEvent(eventDetails: any, taskId: number) {
    if (!this.gapiInited || !this.gisInited) {

      this.translate.get(['Close', 'GAPI or GIS not initialized']).subscribe(translations => {
        // Swal.fire({
        //   text: translations['GAPI or GIS not initialized'],
        //   icon: "error",
        //   showCancelButton: false,
        //   showCloseButton: true,
        //   confirmButtonColor: "#d33",
        //   confirmButtonText: translations['Close']
        // })
      })

      this.reinitializeGapi();
      return;
    }
    this.tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        this.translate.get(['Close', 'Error during token request']).subscribe(translations => {
          // Swal.fire({
          //   text: translations['Error during token request'],
          //   icon: "error",
          //   showCancelButton: false,
          //   showCloseButton: true,
          //   confirmButtonColor: "#d33",
          //   confirmButtonText: translations['Close']
          // })
        })
        throw resp;
      }
      await this.scheduleEvent(eventDetails, taskId);
    };
    try {
      if (gapi.client.getToken() === null) {
        this.tokenClient.requestAccessToken({ prompt: "consent" });
      } else {
        this.tokenClient.requestAccessToken({ prompt: "" });
      }
    } catch (error) {
      this.translate.get(['Close', 'Error requesting access token']).subscribe(translations => {
        Swal.fire({
          text: translations['Error requesting access token'],
          icon: "error",
          showCancelButton: false,
          showCloseButton: true,
          confirmButtonColor: "#d33",
          confirmButtonText: translations['Close']
        })
      })
    }

  }

  private async scheduleEvent(eventDetails: any, taskId: number) {
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
      // attendees: [{ email: eventDetails.email }],
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
      // console.log("event created: ", event);
      // console.log(taskId, event.id);
      this.taskService.updateGoogleId(taskId, event.id).subscribe((res) => {

      }, (err) => {
        this.translate.get(['Close', 'error']).subscribe(translations => {
          Swal.fire({
            text: translations['error'],
            icon: "error",
            showCancelButton: false,
            showCloseButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: translations['Close']
          })
        })
      })
      this.translate.get(['GoogleTaskSuccess', 'viewTaskBord', 'clickHere']).subscribe(translation =>
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: translation['GoogleTaskSuccess'],
          html: `${translation['viewTaskBord']}       
    <a href="${event.htmlLink}" target="_blank" autofocus> ${translation['clickHere']}</a> `,
          showConfirmButton: false,
          timer: 3000
        }));
    });
  }

  public updateGoogleEvent(eventDetails: any, googleId: string) {
    if (!this.gapiInited || !this.gisInited) {
      this.translate.get(['Close', 'GAPI or GIS not initialized']).subscribe(translations => {
        Swal.fire({
          text: translations['GAPI or GIS not initialized'],
          icon: "error",
          showCancelButton: false,
          showCloseButton: true,
          confirmButtonColor: "#d33",
          confirmButtonText: translations['Close']
        })
      })
      this.reinitializeGapi();
      return;
    }
    this.tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        this.translate.get(['Close', 'Error during token request']).subscribe(translations => {
          Swal.fire({
            text: translations['Error during token request'],
            icon: "error",
            showCancelButton: false,
            showCloseButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: translations['Close']
          })
        })
        throw resp;
      }
      await this.scheduleUpdateEvent(eventDetails, googleId);
    };
    try {
      if (gapi.client.getToken() === null) {
        this.tokenClient.requestAccessToken({ prompt: "consent" });
      } else {
        this.tokenClient.requestAccessToken({ prompt: "" });
      }
    } catch (error) {
      this.translate.get(['Close', 'Error requesting access token']).subscribe(translations => {
        Swal.fire({
          text: translations['Error requesting access token'],
          icon: "error",
          showCancelButton: false,
          showCloseButton: true,
          confirmButtonColor: "#d33",
          confirmButtonText: translations['Close']
        })
      })
    }

  }

  private async scheduleUpdateEvent(eventDetails: any, googleId: string) {
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
      attendees: [{ email: eventDetails.email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };
    const request = gapi.client.calendar.events.update({
      calendarId: "primary",
      eventId: googleId,
      resource: event,
    });
    request.execute((event: any) => {
      // console.log("event updated: ", event);
      this.translate.get(['TaskUpdateSuccess', 'viewTaskBord', 'clickHere']).subscribe(translation =>

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: translation['TaskUpdateSuccess'],
          html: `${translation['viewTaskBord']}
    <a href="${event.htmlLink}" target="_blank" autofocus>${translation['clickHere']}/</a> `,
          showConfirmButton: false,
          timer: 3000
        }));
    });
  }

  // 
  public deleteGoogleEvent(googleId: string) {
    if (!this.gapiInited || !this.gisInited) {
      this.translate.get(['Close', 'GAPI or GIS not initialized']).subscribe(translations => {
        Swal.fire({
          text: translations['GAPI or GIS not initialized'],
          icon: "error",
          showCancelButton: false,
          showCloseButton: true,
          confirmButtonColor: "#d33",
          confirmButtonText: translations['Close']
        })
      })
      this.reinitializeGapi();
      return;
    }
    this.tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        this.translate.get(['Close', 'Error during token request']).subscribe(translations => {
          Swal.fire({
            text: translations['Error during token request'],
            icon: "error",
            showCancelButton: false,
            showCloseButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: translations['Close']
          })
        })
        throw resp;
      }

      await this.scheduleDeleteEvent(googleId);
    };
    try {
      // console.log("try");

      if (gapi.client.getToken() === null) {
        this.tokenClient.requestAccessToken({ prompt: "consent" });
      } else {
        this.tokenClient.requestAccessToken({ prompt: "" });
      }
    } catch (error) {
      this.translate.get(['Close', 'Error requesting access token']).subscribe(translations => {
        Swal.fire({
          text: translations['Error requesting access token'],
          icon: "error",
          showCancelButton: false,
          showCloseButton: true,
          confirmButtonColor: "#d33",
          confirmButtonText: translations['Close']
        })
      })
    }
  }

  private async scheduleDeleteEvent(googleId: string) {
    const request = gapi.client.calendar.events.delete({
      calendarId: "primary",
      eventId: googleId,
    });

    request.execute((event: any) => {
      // console.log("event updated: ", event);
      this.translate.get(['deleteTask', 'viewTaskBord', 'clickHere']).subscribe(translation =>

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: translation['deleteTask'],
          html: `${translation['deleteTask']}
    <a href="${event.htmlLink}" target="_blank" autofocus> ${translation['clickHere']}</a> `,
          showConfirmButton: false,
          timer: 3000
        }));
    });
  }

}