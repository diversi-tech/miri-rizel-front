import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl = 'https://localhost:7141/api';

  constructor(private http: HttpClient) { }
  upFile(file: FormData,name:string): Observable<string> {
    console.log(name);
    
    return this.http.post<string>(`${this.baseUrl}/FileUpload/upload?nameFolder=${name}`, file);
  }
  addDocument(document: Document):Observable<boolean> {
    console.log(document);

    return this.http.post<boolean>(`${this.baseUrl}/Document`, document);
  }
  getFolders(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/FileUpload/Folders`);
  }
  getFilesInFolder(folderId:string): Observable<any[]> {

    return this.http.get<any[]>(`${this.baseUrl}/FileUpload/folders/${folderId}/files`);
  }

}
