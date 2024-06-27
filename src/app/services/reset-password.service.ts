import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private apiUrl = 'https://localhost:7141/ResetPassword/'; 

  constructor(private http: HttpClient) {}

  resetPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}Reset`, { email });
  }

  savePassword(pass: string, id: string): Observable<any> {
    return this.http.post<boolean>(`${this.apiUrl}`, { pass, id });
  }

  getme():Observable<boolean>{
    debugger
    return this.http.get<boolean>(`${this.apiUrl}`)
  }

  private serverPassword: string | null = null;

  setServerPassword(password: string) {
    this.serverPassword = password;
  }

  getServerPassword() {
    return this.serverPassword;
  }
}