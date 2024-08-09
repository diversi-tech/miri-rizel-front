import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '@app/Model/Customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StatusCodeUser } from '@app/Model/StatusCodeUser';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpClient) {}
  private apiUrl = `${environment.apiUrl}Customer/`;
  // private headers = new HttpHeaders({
  //   Authorization: `Bearer ${this.getToken()}`,
  // });

  GetAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}`, );
  }
  GetCustomerById(customerId: Number): Observable<any> {
    console.log(
      this.http.get<any>(`${this.apiUrl}GetById?custometId=${customerId}`)
    );

    return this.http.get<any>(
      `${this.apiUrl}GetById?custometId=${customerId}`
    );
  }
  AddNewCustomer(newCustomer: any): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}`, newCustomer);
  }
  EditCustomer(editCustomer: Customer): Observable<boolean> {
    editCustomer.status = editCustomer.status as StatusCodeUser;
    return this.http.put<boolean>(`${this.apiUrl}`, editCustomer );
  }

  DeleteCustomer(customer: Customer): Observable<boolean> {
    customer.status = customer.status as StatusCodeUser;
    return this.http.put<boolean>(`${this.apiUrl}`, customer );
  }
  GetAllStatusUser(): Observable<StatusCodeUser[]> {
    return this.http.get<StatusCodeUser[]>(`${this.apiUrl}GetAllStatus`, );
  }
  existsEmail(email: string): Observable<boolean> {
    console.log('Checking email existence:', email); // לבדוק אם מתבצע קריאה
    return this.http.get<boolean>(`${this.apiUrl}existsEmail?Email=${email}`);
  }
  
  // getToken() {
  //   return localStorage.getItem('token');
  // }
}
