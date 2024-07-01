import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lead } from '../Model/Lead';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  constructor(private http: HttpClient) {}
  private url = 'https://localhost:7141/Lead/';

  addLead(lead: Lead): Observable<Lead> {
    return this.http.post<Lead>(this.url + 'Add', lead);
  }

  // sortByName(name: string): Observable<Lead[]> {
  //   return this.http
  //   .get<Lead[]>(this.url)
  //   .pipe(
  //     map((leads: Lead[]) =>
  //       leads.filter(
  //         (lead) =>
  //           lead.firstName == name ||
  //           lead.lastName == name ||
  //           `${lead.firstName} ${lead.lastName}` == name
  //       )
  //     )
  //   );
  // }

  // sortByCreatedDate(createdDate: Date) {
  //   return this.http
  //   .get<Lead[]>(this.url)
  //   .pipe(
  //     map((leads: Lead[]) =>
  //       leads.filter((lead) => lead.createdDate === createdDate)
  //     )
  //   );
  // }

  // sortByBusinessName(businessName: string) {
  //   return this.http
  //   .get<Lead[]>(this.url)
  //   .pipe(
  //     map((leads: Lead[]) =>
  //       leads.filter((lead) => lead.businessName === businessName)
  //     )
  //   );
  // }


}
