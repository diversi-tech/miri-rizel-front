import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../Model/User"

@Injectable({
    providedIn: 'root'
})

export class AppService {

    constructor(private http: HttpClient) {
    }

    private apiUrl='https://localhost:44337/api/user'
    
    getByPassword(password: string): Observable<User> {
        return this.http.get<User>(`https://localhost:44337/api/getByPassword/${password}`);
    }

    login(username: string, password: string) : Observable<Object>{
        return this.http.post('https://localhost:44337/api/login', { username, password });
    }

    addUser(userDetails: any): Observable<any> {
        const url = `${this.apiUrl}/addUser`; 
        return this.http.post(url, userDetails);
    } 
    
    
}

