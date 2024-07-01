import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://localhost:7141/User/';

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  addUser(userDetails: any): Observable<any> {
    const url = `${this.apiUrl}/addUser`;
    return this.http.post(url, userDetails);
  }

  editUser(email: any): Observable<any> {
    return this.http.get(`${this.apiUrl}?email=${email}`);
  }
  
  editUserPost(user: User) {
    this.http.put(`${this.apiUrl}`, user);
  }

  login(email: string, password: string): Observable<User> {
    debugger
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.get<User>(`${this.apiUrl}Login`, { params }).pipe(
      tap((user) => {
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  getUserMail(): string | null {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }

  // login(username: string, password: string): Observable<Object> {
  //   return this.http.post('https://localhost:44337/api/login', {
  //     username,
  //     password,
  //   });
  // }

  getByPassword(password: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}getByPassword/${password}`);
  }
  
  getByMail(mail: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}getByMail/${mail}`);
  }

  savePassword(email: string, password: string): Observable<any> {
    return this.http.put<boolean>(`${this.apiUrl}`, { email, password });
  }
  // getAll():Observable<Array<User>> {
  //   return this.http.get<Array<User>>(`${this.apiUrl}ReadAll`).pipe(
  //     switchMap((response: Array<User>) => {
  //       return of(response);
  //     }),
  //     catchError(error => {
  //       return throwError(error);
  //     })
  //   );
  // }
}
