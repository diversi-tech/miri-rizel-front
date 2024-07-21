import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../Model/Task';
import {  catchError, of, switchMap, throwError } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  
  private apiUrl = `${environment.apiUrl}task/`

  constructor(private http: HttpClient) { }
  getToken(): string | null {
    const tokenJson = localStorage.getItem('token');
    if (tokenJson) {
      const t = JSON.parse(tokenJson);
      return t.token ;
    }
    return null;
  }
  addTask(task: Task): Observable<any> {
    task.taskId = undefined
    return this.http.post<any>(this.apiUrl, task);
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}GetById/?id=${id}`);
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put<boolean>(`${this.apiUrl}`, task)
  }

  updateGoogleId(taskId: number,googleId:string): Observable<any> {
    return this.http.put<boolean>(`${this.apiUrl}googleCalendar`, {taskId,googleId})
  }

  
  getAllStatus(): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    return this.http.get(`${this.apiUrl}ReadAllStatus`, { headers });
  }

  deleteTask(id:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}?id=${id}`);
  }

  getAllPriorities(): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    return this.http.get<any>(`${this.apiUrl}readAllPriority`, { headers })
  }

  editUserPost(task: Task) {
    this.http.put(`${this.apiUrl}`, task);
  }
  getTaskByIdProject(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}GetByIdProject?id=${id}`);
  }
  getAll():Observable<Array<Task>> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    return this.http.get<Array<any>>(`${this.apiUrl}`, { headers }).pipe(
      switchMap((response: Array<any>) => {
        return of(response);
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  } 
}