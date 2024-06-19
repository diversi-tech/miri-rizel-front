import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  private serverPassword: string | null = null;

  setServerPassword(password: string) {
    this.serverPassword = password;
  }

  getServerPassword() {
    return this.serverPassword;
  }
}
