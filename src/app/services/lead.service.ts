import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lead } from '../Model/Lead';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  private apiUrl = 'https://localhost:7141/Lead';

  constructor(private http: HttpClient) { }

  GetLeadById(id: Number): Observable<Lead> {
    const url = `https://localhost:7141/Lead/GetById?id=${id}`;
    return this.http.get<Lead>(url); // Specify the type of data as Lead
  }

  addLead(lead: Lead): Observable<Lead> {
    return this.http.post<Lead>(`${this.apiUrl}`, lead);
  }

  getAllLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(`${this.apiUrl}`);
  }

  editLead(lead: Lead,id:Number): Observable<Lead>  {
    lead.leadId = id;
    console.log(lead);
    return this.http.put<Lead>(`${this.apiUrl}`, lead);
  }

  deleteLead(id: Number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}?id=${id}`);
  }
}