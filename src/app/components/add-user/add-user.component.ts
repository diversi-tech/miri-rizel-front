import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { AppService } from 'src/app/services/app.services';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  constructor(private users: AppService, private router: Router, private active: ActivatedRoute) {
  }

  userDetails: User = {
    firstName: "",
    lastName: "",
    password: "",
    password2: "",
    email: "",
    role: ""
  };

  passwordsMatch: boolean = true;

  validatePasswords() {
    this.passwordsMatch = this.userDetails.password === this.userDetails.password2;
  }

  alid(pass: string) {
    if (!pass) {
      return null;
    }
    const hasMinLength = pass.length >= 8;
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasNumber = /\d/.test(pass);
    const passwordValid =
      hasMinLength && hasUpperCase && hasNumber;
    return !passwordValid
      ? {
        hasMinLength: hasMinLength,
        hasUpperCase: hasUpperCase,
        hasNumber: hasNumber,
      }
      : null;
  }

  toEnter() {
    if (this.userDetails.firstName == '' || this.userDetails.lastName == '' || this.userDetails.password == '' || this.userDetails.email == '' || this.userDetails.role == '')
      alert("missing details");
    else {
      if (this.userDetails.email.indexOf('@') == -1)
        alert("email error");
      else {
        const help = this.alid(this.userDetails.password);
        if (help != null && !help?.hasMinLength)
          alert("mast length 8");
        else {
          if (help != null && !help?.hasNumber)
            alert("missing number");
          else {
            if (help != null && !help?.hasUpperCase)
              alert("missing upperCase");
            else {
              this.users.addUser(this.userDetails).subscribe(
                response => {
                  console.log('נוסף משתמש בהצלחה:', response);
                },
                error => {
                  console.error('שגיאה בהוספת משתמש:', error);
                }
              );
            }
          }
        }
      }
    }
  }

}






