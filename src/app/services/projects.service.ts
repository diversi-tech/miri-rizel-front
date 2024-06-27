import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../Model/Project';
import { DatePipe, DATE_PIPE_DEFAULT_OPTIONS, formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
    private apiUrl = 'https://localhost:7141/projects/';

    constructor(private http: HttpClient) {}
    addProject(projectDetails: Project): Observable<any> {
       debugger
       const url = `${this.apiUrl}Add`;
  
       
        return this.http.post(url, projectDetails);
      }
    //   resetPassword(email: string): Observable<any> {
    //     return this.http.post<any>(`${this.apiUrl}Reset`, { email });
    //   }
}