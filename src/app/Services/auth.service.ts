import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { catchError, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }
  private _authenticated: boolean = false;

  set accessToken(token: string)
  {
      localStorage.setItem('token', token);
  }

  get accessToken(): string
  {
      return localStorage.getItem('token') ?? '';
  }

  getRole(): number | null {
    const storedRole = localStorage.getItem('authData');
    const role = parseInt(this.decryptRole(storedRole!), 10)
    return role;
  }

  decryptRole(encryptedRole: string): string {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedRole, 'encryptionKey');
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
  }
  getClaim(token: string, claim: string): any {
    const decodedToken=this.getDecodedAccessToken(token)
    // console.log(decodedToken);
    
     return decodedToken ? decodedToken[claim] : null;
   }
   getDecodedAccessToken(token: string): any {
     const helper = new JwtHelperService();
   const decodedToken = helper.decodeToken(token);
   return decodedToken
   }

   isLoggedIn(): boolean {
    return localStorage.getItem('authData') !== null;
  }
  isAuthenticated(): boolean {
    const token = this.accessToken;
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }
  check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( !this.isAuthenticated() )
        {
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it
        return of(true);
    }
    // signInUsingToken(): Observable<any>
    // {
    //     // Sign in using the token
    //     return this._httpClient.post('api/auth/sign-in-with-token', {
    //         accessToken: this.accessToken,
    //     }).pipe(
    //         catchError(() =>

    //             // Return false
    //             of(false),
    //         ),
    //         switchMap((response: any) =>
    //         {
    //             // Replace the access token with the new one if it's available on
    //             // the response object.
    //             //
    //             // This is an added optional step for better security. Once you sign
    //             // in using the token, you should generate a new one on the server
    //             // side and attach it to the response object. Then the following
    //             // piece of code can replace the token with the refreshed one.
    //             if ( response.accessToken )
    //             {
    //                 this.accessToken = response.accessToken;
    //             }

    //             // Set the authenticated flag to true
    //             this._authenticated = true;

    //             // Store the user on the user service
    //             this._userService.user = response.user;

    //             // Return true
    //             return of(true);
    //         }),
    //     );
    // }
}
