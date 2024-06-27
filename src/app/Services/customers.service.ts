import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../Model/Customers';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http:HttpClient) { }
  GetAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>("https://localhost:7141/Customer/GetAllCustomers");
  }
  GetCustomerById(customerId:number): Observable<Customer> {
    return this.http.get<Customer>(`https://localhost:7141/Customer/getCustomerById/?custometId=${customerId}` );
  }
  AddNewCustomer(newCustomer:any):Observable<Customer>{
    return this.http.post<Customer>(`https://localhost:7141/Customer/addNewCustomer/`,newCustomer);
  } 
  EditCustomer(editCustomer:Customer):Observable<boolean>{
    return this.http.put<boolean>(`https://localhost:7141/Customer/editCustomer/`,editCustomer);
  } 
  
  DeleteCustomer(customerId:number):Observable<boolean>{
    
    return this.http.delete<boolean>(`https://localhost:7141/Customer/DeleteCustomer?customerId=${customerId}` );
  } 
}
