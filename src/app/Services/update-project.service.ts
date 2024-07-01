import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Project } from '../Model/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateProjectService {

  constructor(private http:HttpClient) { }

  update(project:Project){
    return this.http.put("https://localhost:7141/projects",project);
  }
}
