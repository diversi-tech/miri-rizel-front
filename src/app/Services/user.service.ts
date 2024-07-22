import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';
import { User } from '../Model/User';
import { environment } from 'src/enviroments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}user/`;

  getToken() {
    return localStorage.getItem('token');
  }

  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.getToken()}`,
  });


  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}readAll`,  {headers: this.headers});

  }

  addUser(userDetails: any): Observable<any> {
    const url = `${this.apiUrl}`;
    userDetails.role = 2;
    console.log(userDetails);
    return this.http.post(url, userDetails)
  }
//אין פונקציה כזו בקונטרלר!!
  editUser(email: any): Observable<any> {
    return this.http.get(`${this.apiUrl}?email=${email}`);
  }
  
  editUserPost(user: User) {
    this.http.put(`${this.apiUrl}`, user, {headers: this.headers});
  }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}Login?email=${email}&password=${password}`).pipe(
      // tap((user) => {
      //   localStorage.setItem('user', JSON.stringify(user));
      // }),
      // tap((token) => {
      //   localStorage.setItem('token', JSON.stringify(token));

      //  console.log(token)
      // })
      tap((response) => {
        const token = response.token;
        const user = {
          userId: response.user.userId,
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          email: response.user.email,
          role: response.user.role
        };
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        // const user2 = response.user;
        const encryptedRole = CryptoJS.AES.encrypt(user.role.toString(), 'encryptionKey').toString();
        localStorage.setItem(user.email, encryptedRole);
        localStorage.setItem('authData', encryptedRole);
    })
    );
  }

  loginGoogle(email: string, name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}LoginGoogle?email=${email}&name=${name}`).pipe(
      // tap((user) => {
      //   localStorage.setItem('user', JSON.stringify(user));
      // }),
      // tap((token) => {
      //   localStorage.setItem('token', JSON.stringify(token));
      //  console.log(token)
      // })
      tap((response) => {
        const token = response.token;
        const user = {
          userId: response.user.userId,
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          email: response.user.email,
          role: response.user.role
        };
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        console.log(token);
        const encryptedRole = CryptoJS.AES.encrypt(user.role.toString(), 'encryptionKey').toString();
        localStorage.setItem(user.email, encryptedRole);
        localStorage.setItem('authData', encryptedRole);
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
//אין פונקציה כזו בקונטרולר שבסרבר!!
  getByPassword(password: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}getByPassword/${password}`);
  }

  getByMail(mail: string): Observable<User> {
    console.log(mail);    
    return this.http.get<User>(`${this.apiUrl}GetByEmail?email=${mail}`, {headers: this.headers});
    // console.log(mail);
    // return this.http.get<User>(`${this.apiUrl}GetByEmail?email=${mail}`);
  }
//-אין לה הרשאה בסרבר, למה?
  savePassword(email: string, password: string): Observable<any> {
    return this.http.put<boolean>(`${this.apiUrl}`, { email, password });
  }
}


