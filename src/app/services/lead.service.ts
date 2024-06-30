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
    return this.http.post<Lead>(`${this.apiUrl}/Add`, lead);
  }

  getAllLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(`${this.apiUrl}/ReadAll`);
  }

  editLead(lead: Lead,id:Number): Observable<Lead>  {
    console.log(lead.leadId);
    lead.leadId = id;
    console.log(lead.leadId);
    return this.http.put<Lead>(`${this.apiUrl}/Update`, lead);
  }

  deleteLead(id: Number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete/?id=${id}`);
  }
}