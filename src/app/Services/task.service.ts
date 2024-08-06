import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '@app/Model/Task';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private apiUrl = `${environment.apiUrl}task/`

  constructor(private http: HttpClient) { }
  // getToken() {
  //   return localStorage.getItem('token');
  // }
  // private headers = new HttpHeaders({
  //   Authorization: `Bearer ${this.getToken()}`,
  // });

  addTask(task: Task): Observable<any> {
    const taskToSend: Task = {
      ...task,
      taskId: undefined,
      project: {
        ...task.project,
        projectId: task.project?.projectId!,
        customer: undefined
      }
    }
    return this.http.post<any>(`${this.apiUrl}`, taskToSend);
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}GetById/?id=${id}`);
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put<boolean>(`${this.apiUrl}`, task)
  }

  updateGoogleId(taskId: number, googleId: string): Observable<any> {
    return this.http.put<boolean>(`${this.apiUrl}googleCalendar?taskId=${taskId}&googleId=${googleId}`, {});
  }

  getAllStatus(): Observable<any> {
    debugger
    return this.http.get<any>(`${this.apiUrl}readAllStatus`)
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}?id=${id}`);
  }

  getAllPriorities(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}readAllPriority`)
  }

  editUserPost(task: Task) {
    this.http.put(`${this.apiUrl}`, task);
  }
  //אין כזה ניתוב בקןמטרולר של משימות
  getTaskByIdProject(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}GetByIdProject?id=${id}`);
  }
  getAll(): Observable<Array<Task>> {
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