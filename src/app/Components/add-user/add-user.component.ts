import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { AddService } from 'src/app/Services/add.services';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private users: AddService, private router: Router, private active: ActivatedRoute) {
  }

  addForm!: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,this.passwordValidator]],
      ConfirmPassword: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }

  get formControls() { return this.addForm.controls; }

  passwordValidator(pass: AbstractControl): ValidationErrors | null {
    const value = pass.value;
    if (!value) {
      return null;
    }
    const hasNumber = /\d/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const validLength = value.length >= 8;
    const passwordValid = hasNumber && hasLowerCase && validLength;
    console.log(!passwordValid);
    
    if (!passwordValid) {
      return { passwordInvalid: true };
    }
    return null;
  }

  passwordsMatch: boolean = true;

  validatePasswords() {
    const passwordOne = this.userDetails.password
    const passwordTwo = this.userDetails.password2
    this.passwordsMatch = passwordOne === passwordTwo;
  }

  userDetails = {
    password: '',
    password2: '',
  };


  toEnter() {
    this.submitted = true;
    if (this.addForm.invalid) { return; }
    //קריאת שרת להוספת המשתמש
    // this.users.addUser(this.userDetails).subscribe(
    //   response => {
    //     console.log('נוסף משתמש בהצלחה:', response);
    //   },
    //   error => {
    //     console.error('שגיאה בהוספת משתמש:', error);
    //   }
    // );
  }
}




























