import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
  })

export class CustomerService {
    private apiUrl = 'https://localhost:7141/Customer';
    constructor(private http: HttpClient) {}
getById(id: Number): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetById?custometId=${id}`);
  }
  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }




}
