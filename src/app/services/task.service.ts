import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { Task } from '../Model/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {

  }
  private apiUrl = 'https://localhost:7141/Task/'

  
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
