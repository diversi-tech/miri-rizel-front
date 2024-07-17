import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@app/Model/Project';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  
  private apiUrl = `${environment.apiUrl}Projects/`

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    return this.http.get(this.apiUrl, { headers });
   
  }
  addProject(projectDetails: Project): Observable<any> {
    const url = `${this.apiUrl}`;
     return this.http.post(url, projectDetails);
   }
   deleteProject(id: Number): Observable<Boolean> {
    return this.http.delete<Boolean>(`${this.apiUrl}?id=${id}`);
  }
  getTaskByProject(projectId:string):Observable<any>{
    return this.http.get(`https://localhost:7141/projects/getAllTasks${projectId}`);
}
update(project:Project){
  return this.http.put("https://localhost:7141/Tasks/UpdateTask",project);
}
getProjectById(id:number): Observable<any> {
  return this.http.get(`https://localhost:7141/projects/GetProjectById?id=${id}`);
}

getToken(): string | null {
  const tokenJson = localStorage.getItem('token');
  if (tokenJson) {
    const t = JSON.parse(tokenJson);
    return t.token ;
  }
  return null;
}
}

