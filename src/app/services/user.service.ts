import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://localhost:7141/User';

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);

  }

  addUser(userDetails: any): Observable<any> {
    const url = `${this.apiUrl}`;
    userDetails.role = 2;
    console.log(userDetails);
    return this.http.post(url, userDetails);
  }

  editUser(email: any): Observable<any> {
    return this.http.get(`${this.apiUrl}?email=${email}`);
  }
  editUserPost(user: User) {
    this.http.put(`${this.apiUrl}`, user);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`https://localhost:7141/User/Login?email=${email}&password=${password}`).pipe(
      tap((user) => {
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  loginGoogle(email: string, name: string): Observable<User> {
    return this.http.get<User>(`https://localhost:7141/User/LoginGoogle?email=${email}&name=${name}`).pipe(
      tap((user) => {
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  getUserMail(): string | null {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      return user.email || null;
    }
    return null;
  }

  getByPassword(password: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}getByPassword/${password}`);
  }

  getByMail(mail: string): Observable<User> {
    console.log(mail);    
    return this.http.get<User>(`https://localhost:7141/User/GetByEmail?email=${mail}`);
  }

  savePassword(email: string, password: string): Observable<any> {
    return this.http.put<boolean>(`${this.apiUrl}`, { email, password });
  }

}
