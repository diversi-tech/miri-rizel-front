import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

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
}