import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';
import { User } from '@app/Model/User';
import { environment } from 'src/enviroments/environment';
import * as CryptoJS from 'crypto-js';
import { RoleCodeUser } from '@app/Model/RoleCodeUser';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
  }
  private apiUrl = `${environment.apiUrl}User/`;

  // getToken() {
  //   return localStorage.getItem('token');
  // }

  // private headers = new HttpHeaders({
  //   Authorization: `Bearer ${this.getToken()}`,
  // });


  //אין פונקציה כזו בקונטרלר!!
  // editUser(email: any): Observable<any> {
  //   return this.http.get(`${this.apiUrl}?email=${email}`);
  // }

  // editUserPost(user: User) {
  //   this.http.put(`${this.apiUrl}`, user, {headers: this.headers});
  // }

  login(email: string, password: string): Observable<any> {

    return this.http
      .get<any>(`${this.apiUrl}Login?email=${email}&password=${password}`)
      .pipe(
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
            role: response.user.role,
          };
          // console.log("user",user);

          // localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);
          // const user2 = response.user;
          const encryptedRole = CryptoJS.AES.encrypt(
            user.role.id.toString(),
            'encryptionKey'
          ).toString();
          localStorage.setItem('authData', encryptedRole);
        })
      );
  }

  loginGoogle(email: string): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}LoginGoogle?email=${email}`)
      .pipe(
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
            role: response.user.role,
          };
          // localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);
          const encryptedRole = CryptoJS.AES.encrypt(
            user.role.id.toString(),
            'encryptionKey'
          ).toString();
          localStorage.setItem('authData', encryptedRole);
        })
      );
  }

  getAll(): Observable<any> {
    // const head = new HttpHeaders({
    //   Authorization: `Bearer ${this.getToken()}`,
    // });
    return this.http.get(`${this.apiUrl}`);
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
  // getByPassword(password: string): Observable<User> {
  //   return this.http.get<User>(`${this.apiUrl}getByPassword/${password}`);
  // }

  getByMail(mail: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}GetByEmail?email=${mail}`);
    // console.log(mail);
    // return this.http.get<User>(`${this.apiUrl}GetByEmail?email=${mail}`);
  }

  getUserById(id: Number) {

    return this.http.get<User>(`${this.apiUrl}GetById?id=${id}`);
  }
  addUser(userDetails: any): Observable<any> {
    debugger
    const url = `${this.apiUrl}`;
    if (!userDetails.role)
      userDetails.role = { id: 1, description: 'Customer' };
    return this.http.post(url, userDetails);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<boolean>(`${this.apiUrl}`, user);
  }

  deleteUserById(userId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}DeleteById?id=${userId}`);
  }
  deleteUserEmail(email: string): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.apiUrl}DeleteByEmail?email=${email}`
    );
  }
  //אין לה הרשאה בסרבר, למה?
  savePassword(email: string, password: string): Observable<any> {
    return this.http.put<boolean>(`${this.apiUrl}Password`, {
      email,
      password,
    });
  }

  getAllRoles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}roles`);
  }

  signOut() {
    // localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('authData');
  }
}
