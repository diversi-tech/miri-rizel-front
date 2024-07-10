import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl = 'https://localhost:7141/api';

  constructor(private http: HttpClient) { }
  upFile(file: FormData): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/FileUpload/upload`, file);
  }
  addDocument(document: Document):Observable<boolean> {
    console.log(document);
    
    return this.http.post<boolean>(`${this.baseUrl}/Document`, document);
  }
  getFiles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/FileUpload/list`);
  }
}
