import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
// import { User } from '../models/User';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http:HttpClient) { }
  baseUrl:string="https://localhost:7292/webapi/"
  
  login(email:string,password:string):Observable<User>
  {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
      return this.http.get<User>(this.baseUrl, { params }).pipe(
        tap(user => {
          localStorage.setItem('user', JSON.stringify(user));
        })
      );    
    
  }
  getUser(): User | null {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }
}
