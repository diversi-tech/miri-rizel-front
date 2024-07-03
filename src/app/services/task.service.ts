import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../Model/Task';
import {  catchError, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://localhost:7141/task/';

  constructor(private http: HttpClient) { }

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

  getAllStatus(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}readAllStatus`)
  }

  deleteTask(id:number):Observable<any>{
    debugger
    return this.http.delete<any>(`${this.apiUrl}?id=${id}`);
  }

  getAllPriorities(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}readAllPriority`)
  }

  editUserPost(task: Task) {
    this.http.put(`${this.apiUrl}`, task);
  }
  getAll():Observable<Array<Task>> {
    return this.http.get<Array<Task>>(`${this.apiUrl}`).pipe(
      switchMap((response: Array<Task>) => {
        return of(response);
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  } 
}