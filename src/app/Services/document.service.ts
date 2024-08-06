import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl = `${environment.apiUrl}api`;

  constructor(private http: HttpClient) { }
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.getToken()}`,
  });
  getToken() {
    return localStorage.getItem('token');
  }
  upFile(file: FormData, name: string): Observable<string> {

    return this.http.post(`${this.baseUrl}/FileUpload/upload?nameFolder=${name}`, file, { 
      headers: this.headers,
      responseType: 'text' });
  }
  
  addDocument(document: Document,nameCustomer: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/Document?name=${nameCustomer}`, document);
  }
  getFolders(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/FileUpload/Folders`);
  }
  getFilesInFolder(folderId: string): Observable<any[]> {

    return this.http.get<any[]>(`${this.baseUrl}/FileUpload/folders/${folderId}/files`);
  }

  sendEmail(nameCustomer: string): Observable<any> {  
    return this.http.post<any>(`${this.baseUrl}/Document/send`, {nameCustomer});
  }


  
}
