import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }
  private apiUrl = 'https://localhost:7141/User/'

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
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.get<User>(`${this.apiUrl}Login`, { params }).pipe(
      tap(user => {
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
    return this.http.get<User>(
      `${this.apiUrl}getByPassword/${password}`
    );
  } 
  getByMail(mail: string): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}getByMail/${mail}`
    );
  }
}
