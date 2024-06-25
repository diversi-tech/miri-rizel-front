import { Component, OnInit, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators, } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Model/User';
import { ResetPasswordService } from '../../Services/reset-password.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { UserService } from 'src/app/Services/user.service';

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

      ]),
    });
  }

  constructor(
    private resetPasswordService: ResetPasswordService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide);
    event.stopPropagation();
  }

  logInForm: FormGroup = new FormGroup({});

  get email() { return this.logInForm.controls['email'] }
  get pass() { return this.logInForm.controls['password'] }

  onSubmit() {
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
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.value)) {
      this.resetPasswordService.resetPassword(this.email.value).subscribe(
        (response) => {
          this.router.navigate(['/ResetPassword']);
          this.resetPasswordService.setServerPassword(response);
        },
        (err) => {
          if (err.status == 400) {
            this.dialog.open(DialogComponent, {
              data: {
                title: 'שגיאה',
                context: 'כתובת המייל אינה מופיעה במערכת',
                buttonText: 'סגור',
              },
            });
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
    // פה יהיה ניתוב לדף הרישום
    this.router.navigate(['/sign-up'])
  }
}
