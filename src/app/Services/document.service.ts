import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl = 'https://localhost:7141/api/FileUpload';  // שנה לכתובת ה-API שלך

  constructor(private http: HttpClient) { }
  upFile(file: FormData): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/upload`, file);
  }
  addDocument(document: FormData):Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/upload`, document);
  }
  getFiles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/list`);
  }
}
