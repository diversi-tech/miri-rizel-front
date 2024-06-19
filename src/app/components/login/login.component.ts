import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]]
    });
  }

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

    if (this.loginForm.invalid) {return;}

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.loginService.login(email, password).subscribe(
      (user: User) => {
        console.log('Login successful', user);
        this.router.navigate(['/home']); // ניתוב לדף הבית לאחר התחברות מוצלחת
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}

