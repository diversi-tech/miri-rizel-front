import { Component, OnInit, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ResetPasswordService } from '../../services/reset-password.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import { CodeService } from 'src/app/services/code-service.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
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

  // errorMessage = signal('');

  // updateErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     this.errorMessage.set('You must enter a value');
  //   } else if (this.email.hasError('email')) {
  //     this.errorMessage.set('Not a valid email');
  //   } else {
  //     this.errorMessage.set('');
  //   }
  // }

  // isValidEmail(email: AbstractControl) {
  //   if (!email) return { req: true };
  //   if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
  //     return { notValid: true };
  //   }
  //   return null;
  // }

  logInForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, []),
    });
  }

  get email() {
    return this.logInForm.controls['email'];
  }

  get pass() {
    return this.logInForm.controls['password'];
  }

  onSubmit() {
    console.log('submit...');
    // כאן תוכל להוסיף את הלוגיקה של התחברות למערכת
    // לדוגמה: קריאה לשירות או בדיקת אימות
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
          // if (res.status == 200) {
          //   this.router.navigate(['/ResetPassword']);
          //   console.log('-----res-----');
          //   console.log(res);
          //   this.codeService.setServerPassword(res)

          // this.dialog.open(DialogComponent, {
          //   data: {
          //     title: 'Success',
          //     context:
          //       'בדוק את חשבון המייל שלך, שלחנו לך מייל להמשך הליך איפוס הסיסמה',
          //     buttonText: 'Close',
          //   },
          // });
          // } else {
          this.dialog.open(DialogComponent, {
            data: {
              title: 'שגיאה',
              context: 'ארעה תקלה במהלך שליחת המייל, נסה שנית',
              buttonText: 'סגור',
            },
          });
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
}
