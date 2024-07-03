import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }
  upFile(file: FormData): Observable<string> {
    return this.http.post<string>("https://localhost:7141/api/FileUpload/upload",file);
  }
}
