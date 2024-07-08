
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
    private userService: UserService,
    private active: ActivatedRoute
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
    const email = this.email.value;
    const password = this.pass.value;
    this.userService.login(email, password).subscribe(
      (user: User) => {
        this.router.navigate(['/home', user.role]);
    //     console.log("user");
    //     if (user.role == 1) {
    //       this.router.navigate(['/admin'], { relativeTo: this.active });
    //     }
    //     if (user.role == 2) {
    //       this.router.navigate(['/worker'], { relativeTo: this.active });
    //     }
    //     if (user.role == 3) {
    //       this.router.navigate(['/customer'], { relativeTo: this.active });
    //     }
    //   },
    //   error => {
    //     this.dialog.open(DialogComponent, {
    //       data: {
    //         title: 'שגיאה',
    //         context: 'ארעה תקלה במהלך ההתחברות, נסה שנית',
    //         buttonText: 'סגור',
    //       },
    //     });
    }
   );
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
   this.router.navigate(['../signUp']);
  }
}
