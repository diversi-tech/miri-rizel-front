import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private active: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
    });
  }

  userLogIn: User = {
    firstName: "",
    lastName: "",
    password: "",
    password2: "",
    email: "",
    role: ""
  };

  get formControls() { return this.loginForm.controls; }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasNumber = /\d/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const validLength = value.length >= 8;

    const passwordValid = hasNumber && hasLowerCase && validLength;

    if (!passwordValid) {
      return { passwordInvalid: true };
    }
    return null;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) { return; }
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
  //   this.loginService.getByPassword(password).subscribe((user: User) => {
  //   this.userLogIn = user;
  //   if (this.userLogIn['email'] != email) {
  //     alert("error");
  //   } else {
  //   localStorage.setItem('user', email);
  //   this.loginService.login(email, password);
  //   if (this.userLogIn['role'] == "admin") {
  //     this.router.navigate(['Admin'], { relativeTo: this.active });
  //   }
  //   if (this.userLogIn['role'] == "worker") {
  //     this.router.navigate(['worker'], { relativeTo: this.active });
  //   }
  //   if (this.userLogIn['role'] == "customer") {
  //     this.router.navigate(['customer'], { relativeTo: this.active });
  //   }
  //   }
  // });
  }
}

