import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Project } from '@app/Model/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  update(project:Project){
    return this.http.put("https://localhost:7141/projects",project);
  }
}
