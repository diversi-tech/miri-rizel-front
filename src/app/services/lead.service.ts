import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lead } from '../Model/Lead';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  constructor(private http: HttpClient) {}
  private url = 'https://localhost:7141/Lead/';

  addLead(lead: Lead): Observable<Lead> {
    console.log("hello service");
    
    return this.http.post<Lead>(this.url + 'Add', lead);
  }
}
