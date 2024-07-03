import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

declare var gapi: any;

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent {

  private CLIENT_ID = '592574124687-bvpc5dmgfms66j1q6725fi5gevmsmtmf.apps.googleusercontent.com';
  private API_KEY = 'AIzaSyC4vBZb53tmbQbIsADuf6qPu74EE2QcZOA';
  private DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
  private SCOPES = 'https://www.googleapis.com/auth/drive.file';
  uploadForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
    this.initClient();
  }

  initClient() {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: this.API_KEY,
        clientId: this.CLIENT_ID,
        discoveryDocs: this.DISCOVERY_DOCS,
        scope: this.SCOPES
      }).then(() => {
        console.log('Google API initialized');
      });
    });
  }



  uploadFile() {
    if (this.selectedFile) {
      const metadata = {
        'name': this.selectedFile.name,
        'mimeType': this.selectedFile.type
      };

      const accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
      const form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      form.append('file', this.selectedFile);

      fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
        body: form,
      }).then((response) => {
        return response.json();
      }).then((value) => {
        console.log(value);
      });
    }
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    this.uploadFile();
  }
}
