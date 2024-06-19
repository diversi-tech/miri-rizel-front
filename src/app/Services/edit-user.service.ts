import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {

  constructor(private http:HttpClient) { }
  
  
  editUser(email:any):Observable<any>{
    return this.http.get(`https://localhost:7141/WeatherForecast/?email=${email}`);
 }
 editUserPost(user:user){
   this.http.put("https://localhost:7141/WeatherForecast",user);
}
}
