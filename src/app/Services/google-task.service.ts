import { Injectable, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import Swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { TaskService } from './task.service';

declare var google: any;
declare var gapi: any;

@Injectable({
  providedIn: 'root'
})

export class GoogleTaskService {
  private CLIENT_ID = environment.CLIENT_ID;
  private API_KEY = environment.API_KEY;
  private DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest';
  private SCOPES = 'https://www.googleapis.com/auth/tasks';

  private tokenClient: any;
  private gapiInited = false;
  private gisInited = false;

  constructor(
    private ngZone: NgZone,
    private taskService: TaskService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadGapi();
      this.loadGis();
    }
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
    // console.log('GAPI client initialized');
  }

  private gisLoaded() {
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: this.CLIENT_ID,
      scope: this.SCOPES,
      callback: (tokenResponse: any) => {
        if (tokenResponse.error !== undefined) {
          console.error('Error during token request', tokenResponse.error);
          throw tokenResponse;
        }
        // console.log('Token received');
      },
    });
    this.gisInited = true;
    // console.log('GIS client initialized');
  }

  private reinitializeGapi() {
    gapi.client
      .init({
        apiKey: this.API_KEY,
        discoveryDocs: [this.DISCOVERY_DOC],
      })
      .then(() => {
        this.gapiInited = true;
        // console.log('GAPI client reinitialized');
      });
  }

  public createSimpleTask(taskDetails: any, taskId: number) {
    if (!this.gapiInited || !this.gisInited) {
      // console.error('GAPI or GIS not initialized');
      this.reinitializeGapi();
      return;
    }

    this.tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        // console.error('Error during token request', resp.error);
        throw resp;
      }
      await this.addTask(taskDetails, taskId);
    };

    try {
      if (gapi.client.getToken() === null) {
        this.tokenClient.requestAccessToken({ prompt: 'consent' });
      } else {
        this.tokenClient.requestAccessToken({ prompt: '' });
      }
    } catch (error) {
      console.error('Error requesting access token', error);
    }
    // console.log('Token request initiated');
  }

  private async addTask(taskDetails: any, taskId: number) {
    // console.log("taskDetails", taskDetails);

    const task = {
      title: taskDetails.title,
      notes: taskDetails.notes,
      due: taskDetails.dueTime,
      ...(taskDetails.status == 'COMPLETE' && { status: 'completed' })
    };

    try {
      const request = gapi.client.tasks.tasks.insert({
        tasklist: '@default',
        resource: task,
      });

      request.execute((task: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'המשימה נוצרה בהצלחה',
          showConfirmButton: false,
          timer: 3000,
        });
        // שמירה של הקוד משימה במסד
        // console.log('Task created:', taskId);
        // console.log(task.id);
        this.taskService.updateGoogleId(taskId, task.id).subscribe((res) => {
          // console.log(res);
        }, (err) => {
          // console.log(err);
        })

      });
    } catch (error) {
      // console.error('Error creating task:', error);
    }
  }

  // updateTask()
  public updateGoogleTask(taskDetails: any, googleId: string) {
    if (!this.gapiInited || !this.gisInited) {
      console.error('GAPI or GIS not initialized');
      this.reinitializeGapi();
      return;
    }

    this.tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        console.error('Error during token request', resp.error);
        throw resp;
      }

      // שלוף את taskId מהמערכת שלך או מהמאגר נתונים
      if (!googleId) {
        console.error('Task ID not found');
        return;
      }

      await this.modifyTask({ ...taskDetails, googleId });
    };

    try {
      if (gapi.client.getToken() === null) {
        this.tokenClient.requestAccessToken({ prompt: 'consent' });
      } else {
        this.tokenClient.requestAccessToken({ prompt: '' });
      }
    } catch (error) {
      console.error('Error requesting access token', error);
    }
    // console.log('Token request initiated');
  }

  private async modifyTask(taskDetails: any) {
    // console.log("taskDetails", taskDetails);

    const task = {
      id: taskDetails.googleId,
      title: taskDetails.title,
      notes: taskDetails.notes,
      due: taskDetails.dueTime,
      ...(taskDetails.status == 'COMPLETE' && { status: 'completed' })
    };
    // console.log("task", task);


    try {
      const request = gapi.client.tasks.tasks.update({
        tasklist: '@default',
        task: task.id,
        resource: task,
      });

      request.execute((task: any) => {
        if (task.code == 404) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'לא ניתן היה לעדכן את המשימה',
            showConfirmButton: false,
            timer: 3000,
          });
          return;
        }
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'המשימה עודכנה בהצלחה',
          showConfirmButton: false,
          timer: 3000,
        });
        // console.log('Task updated:', task);
      });
    } catch (error) {
      // console.error('Error updating task:', error);
    }
  }

  public deleteTask(taskId: string) {
    if (!this.gapiInited || !this.gisInited) {
      console.error('GAPI or GIS not initialized');
      this.reinitializeGapi();
      return;
    }

    this.tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        console.error('Error during token request', resp.error);
        throw resp;
      }
      await this.removeTask(taskId);
    };

    try {
      if (gapi.client.getToken() === null) {
        this.tokenClient.requestAccessToken({ prompt: 'consent' });
      } else {
        this.tokenClient.requestAccessToken({ prompt: '' });
      }
    } catch (error) {
      // console.error('Error requesting access token', error);
    }
    // console.log('Token request initiated');
  }

  private async removeTask(taskId: string) {
    try {
      const request = gapi.client.tasks.tasks.delete({
        tasklist: '@default',
        task: taskId,
      });

      request.execute(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'המשימה נמחקה בהצלחה',
          showConfirmButton: false,
          timer: 3000,
        });
        // console.log('Task deleted:', taskId);
      });
    } catch (error) {
      // console.error('Error deleting task:', error);
    }
  }
}
