import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl = 'https://localhost:7141/api';

  constructor(private http: HttpClient) { }
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.getToken()}`,
  });
  getToken() {
    return localStorage.getItem('token');
  }
  upFile(file: FormData, name: string): Observable<string> {
    console.log(name);
    return this.http.post<any>(`${this.baseUrl}/FileUpload/upload?nameFolder=${name}`, file, { headers: this.headers });
  }
  addDocument(document: Document): Observable<boolean> {
    // console.log(document);
    console.log("addDocument");
    return this.http.post<boolean>(`${this.baseUrl}/Document`, document, { headers: this.headers });
  }
  getFolders(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/FileUpload/Folders`, { headers: this.headers });
  }
  getFilesInFolder(folderId: string): Observable<any[]> {

    return this.http.get<any[]>(`${this.baseUrl}/FileUpload/folders/${folderId}/files`, { headers: this.headers });
  }

  sendEmail(nameCustomer: string): Observable<any> {  
    return this.http.post<any>(`${this.baseUrl}/Document/send`, {nameCustomer});
  }
  
}
