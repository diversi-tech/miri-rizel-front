import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../Model/User"

@Injectable({
    providedIn: 'root'
})

export class AddService {

    constructor(private http: HttpClient) {
    }

    private apiUrl='https://localhost:44337/api/user'
    
    addUser(userDetails: any): Observable<any> {
        const url = `${this.apiUrl}/addUser`; 
        return this.http.post(url, userDetails);
    } 
    
    
}

