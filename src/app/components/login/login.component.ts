import { Component, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { ResetPasswordService } from '../../services/reset-password.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CodeService } from 'src/app/services/code-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    this.logInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        // צריך בדיקת תקינות לסיסמה בעת התחברות?
        // this.passwordValidator.bind(this)
      ]),
    });
  }

  constructor(
    private resetPasswordService: ResetPasswordService,
    private dialog: MatDialog,
    private router: Router,
    private codeService: CodeService
  ) {}

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide);
    event.stopPropagation();
  }

  userLogIn: User = {
    firstName: '',
    lastName: '',
    password: '',
    // password2: "",
    email: '',
    role: '',
  };
  // // תקינות סיסמה
  // passwordValidator(control: AbstractControl): ValidationErrors | null {
  //   const value = control.value;

  //   if (!value) {
  //     return null;
  //   }

  //   const hasLowerCase = /[a-z]/.test(value);
  //   const validLength = value.length >= 8;
  //   const hasNumber = /\d/.test(value);

  //   const passwordValid = hasLowerCase && validLength && hasNumber;

  //   return !passwordValid
  //     ? {
  //         validLength: validLength,
  //         hasLowerCase: hasLowerCase,
  //         hasNumber: hasNumber,
  //       }
  //     : null;
  // }

  logInForm: FormGroup = new FormGroup({});

  get email() {
    return this.logInForm.controls['email'];
  }

  get pass() {
    return this.logInForm.controls['password'];
  }

  onSubmit() {
    console.log('submit...');
    if (this.logInForm.invalid) {
      return;
    }
    const email = this.logInForm.get('email')?.value;
    const password = this.logInForm.get('password')?.value;
    console.log(email, password);
    // קריאת שרת לבדוק שהמשתמש קיים ויכול להכנס למערכת
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
  resetPassword() {
    // בדיקה שהכתובת מייל תקינה אחרת שולח הודעת שגיאה
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.value)) {
      this.resetPasswordService.resetPassword(this.email.value).subscribe(
        (response) => {
          this.router.navigate(['/ResetPassword']);
          this.codeService.setServerPassword(response);
        },
        (err) => {
          if (err.status == 200) {
            this.router.navigate(['/ResetPassword']);
            this.codeService.setServerPassword(err);
          } else {
            this.dialog.open(DialogComponent, {
              data: {
                title: 'שגיאה',
                context: 'ארעה תקלה במהלך שליחת המייל, נסה שנית',
                buttonText: 'סגור',
              },
            });
          }
          // }
        }
      );
    } else {
      console.log('כתובת מייל לא תקינה');
      this.dialog.open(DialogComponent, {
        data: {
          title: 'שגיאה',
          context: 'נראה שכתובת המייל שהכנסת אינה תקינה',
          buttonText: 'סגור',
        },
      });
    }
  }
  signUp() {
    console.log('signUp...');
    // פה יהיה ניתוב לדף הרישום
    // this.router.navigate(['/sign-up'])
  }
}
