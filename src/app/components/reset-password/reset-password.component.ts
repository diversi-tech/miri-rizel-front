import { Component, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ResetPasswordService } from '../../services/reset-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(private reset: ResetPasswordService, private route: Router) {}

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        this.valid.bind(this),
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
      const id = '1234';

      this.reset.savePassword(password, id).subscribe(
        (res) => {
          console.log('Password updated successfully:', res);
          // ניתוב להתחברות עם הסיסמה החדשה
          this.route.navigate(['/LogIn']);
        },
        (error) => {
          console.error('Error updating password:', error);
        }
      );
    }
  }

  // תקינות סיסמה
  valid(pass: AbstractControl) {
    const value = pass.value;

    if (!value) {
      return null;
    }

    const hasMinLength = value.length >= 8;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);

    const passwordValid = hasMinLength && hasUpperCase && hasNumber;

    return !passwordValid
      ? {
          hasMinLength: hasMinLength,
          hasUpperCase: hasUpperCase,
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
