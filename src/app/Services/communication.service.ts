import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Communication } from '@app/Model/Communication';
import { environment } from 'src/enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http:HttpClient) { }
  
  apiUrl=`${environment.apiUrl}Communication`

  AddNewCommunication(requestBody:Communication):Observable<Communication>{
    
    return this.http.post<Communication>(`${this.apiUrl}`,requestBody);
  }

  readAll():Observable<Communication[]>{
    return this.http.get<Communication[]>(`${this.apiUrl}`);
  } 

  deleteCommunication(communicationId:number):Observable<boolean>{
    return this.http.delete<boolean>(`${this.apiUrl}?id=${communicationId}` );
  } 
  
  getbyIdLCommunication(communicationId:number){
    return this.http.get<Communication[]>(`${this.apiUrl}/GetByIdL?id=${communicationId}` );
  } 

  getbyIdCCommunication(communicationId:number){
    return this.http.get<Communication[]>(`${this.apiUrl}/GetByIdC?id=${communicationId}` );
  } 
}
