import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@app/Services/user.service';
import { GoogleComponent } from '../google/google.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SharedModule } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
    standalone: true,
    imports: [ CalendarModule,InputTextModule, TranslateModule, NgIf, FormsModule, ReactiveFormsModule, MatButtonModule,
      DropdownModule,
      AutoCompleteModule,
      SharedModule, MatFormFieldModule, GoogleComponent]
})
export class SignUpComponent {

  signUpForm!: FormGroup;
  submitted = false;
  passwordsMatch = true;
  userData: String="signUp"

  userDetails = {
    password: '',
    password2: '',
  };

  constructor(private dialog: MatDialog,private router: Router,private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.fullForm(); // Call the function to initialize the form
  }

  fullForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required, this.passwordValidator]],
      ConfirmPassword: ['', [Validators.required]],
      role: [2]
    });
  }

  validatePasswords() {
    const passwordOne = this.userDetails.password;
    const passwordTwo = this.userDetails.password2;
    this.passwordsMatch = passwordOne === passwordTwo;
  }

  passwordValidator(control: any) {
    const value = control.value;
    if (!value) {
      return null;
    }
    const hasNumber = /\d/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const validLength = value.length >= 8;
    const passwordValid = hasNumber && hasLowerCase && validLength;
    return passwordValid ? null : { passwordInvalid: true };
  }

  async toEnter() {
    console.log("enter");
    this.submitted = true;
    if (this.signUpForm.invalid) { return; }
    console.log("seccsus");
    this.userService.addUser(this.signUpForm.value).subscribe(
      () => {
        console.log("User added");
        this.router.navigate(['../worker']);
      },
      (error) => {
        this.dialog.open(DialogComponent, {
              data: {
                title: 'שגיאה',
                context: 'כתובת מייל כבר קיימת',
                buttonText: 'סגור',
              },
            })}
    );
  }


}


