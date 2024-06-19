import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/Model/User'

@Injectable({
  providedIn: 'root'
})
export class EditUserService {

  constructor(private http:HttpClient) { }
  
  
  editUser(email:any):Observable<any>{
    return this.http.get(`https://localhost:7141/WeatherForecast/?email=${email}`);
 }
 editUserPost(user:User){
   this.http.put("https://localhost:7141/WeatherForecast",user);
}
}
