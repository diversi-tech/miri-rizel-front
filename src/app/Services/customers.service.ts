import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../Model/Customer';
import { HttpClient } from '@angular/common/http';
import { StatusCodeUser } from '@app/Model/StatusCodeUser';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http:HttpClient) { }
  private apiUrl = `${environment.apiUrl}Customer/`

  GetAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}`);
  }
  GetCustomerById(customerId:number): Observable<any> {
    console.log(this.http.get<any>(`${this.apiUrl}GetById?custometId=${customerId}` ));
    
    return this.http.get<any>(`${this.apiUrl}GetById?custometId=${customerId}` );
}
  AddNewCustomer(newCustomer:any):Observable<Customer>{
    return this.http.post<Customer>(`${this.apiUrl}`,newCustomer);
  } 
  EditCustomer(editCustomer:Customer):Observable<boolean>{
    editCustomer.status=editCustomer.status as StatusCodeUser;    
    return this.http.put<boolean>(`${this.apiUrl}`,editCustomer);
  } 
  
  DeleteCustomer(customerId:number):Observable<boolean>{
    
    return this.http.delete<boolean>(`${this.apiUrl}?customerId=${customerId}`);
  } 
  GetAllStatusUser():Observable<StatusCodeUser[]>{
    return this.http.get<StatusCodeUser[]>(`${this.apiUrl}GetAllStatus`);
  }
}
