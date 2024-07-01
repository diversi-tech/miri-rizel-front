import { Component, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ResetPasswordService } from '../../Services/reset-password.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(private reset: ResetPasswordService, private route: Router, private userService: UserService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        this.passwordValidator.bind(this),
      ]),
      passwordAuthentication: new FormControl(null, [
        Validators.required,
        this.isMatched.bind(this),
      ]),
    });
  }

  // פונקציות ומשתנים להסתרת והצגת הסיסמאות
  hide = signal(true);
  hideAuth = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide);
    event.stopPropagation();
  }

  clickEventAuth(event: MouseEvent) {
    this.hideAuth.set(!this.hideAuth);
    event.stopPropagation();
  }

  resetForm: FormGroup = new FormGroup({});

  get pass() {
    return this.resetForm.controls['password'];
  }

  get authPass() {
    return this.resetForm.controls['passwordAuthentication'];
  }

  onSubmit() {
    // שליחת הסיסמה החדשה
    if (this.resetForm.valid) {
      const password = this.pass.value;
      // שליפה של הקוד לקוח
      const email = this.userService.getUserMail();
      this.userService.savePassword(email!, password).subscribe(
        (res) => {
          // ניתוב להתחברות עם הסיסמה החדשה
          if (res === true) {
            this.dialog.open(DialogComponent, {
              data: {
                title: 'סיסמתך עודכנה בהצלחה',
                context: 'הנך מועבר להתחברות מחדש',
                buttonText: 'סגור',
              },
            });

            this.route.navigate(['/login']);
          }
        },
        (error) => {
          console.error('Error updating password:', error);
        }
      );
    }
  }

  // תקינות סיסמה
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasLowerCase = /[a-z]/.test(value);
    const validLength = value.length >= 8;
    const hasNumber = /\d/.test(value);

    const passwordValid = hasLowerCase && validLength && hasNumber;

    return !passwordValid
      ? {
        validLength: validLength,
        hasLowerCase: hasLowerCase,
        hasNumber: hasNumber,
      }
      : null;
  }

  // אימות סיסמה
  isMatched(password: AbstractControl) {
    if (!password.value) return { req: true };
    if (password.value != this.pass.value) return { notValid: true };
    return null;
  }
}
