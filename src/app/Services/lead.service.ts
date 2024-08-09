import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lead } from '@app/Model/Lead';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  private apiUrl = `${environment.apiUrl}Lead`
  constructor(private http: HttpClient) { }
  // getToken() {
  //   return localStorage.getItem('token');
  // }
  // private headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });


  GetLeadById(id: Number): Observable<Lead> {
    const url = `${this.apiUrl}/GetById?id=${id}`;
    return this.http.get<Lead>(url); 
  }

  addLead(lead: Lead): Observable<Lead> {
    return this.http.post<Lead>(`${this.apiUrl}`, lead);
  }
  existsEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/existsEmail?Email=${email}`,);
  }

  getAllLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(`${this.apiUrl}`);
  }

  editLead(lead: Lead,id:Number): Observable<Lead>  {
    lead.leadId = id;
    return this.http.put<Lead>(`${this.apiUrl}`, lead);
  }

  deleteLead(id: Number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}?id=${id}`);
  }
}