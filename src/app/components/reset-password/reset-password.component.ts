import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ResetPasswordService } from '../../Services/reset-password.service';
import { Router } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';
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
        this.passwordValidator.bind(this),
      ]),
      passwordAuthentication: new FormControl(null, [
        Validators.required,
        this.isMatched.bind(this),
      ]),
    });
  }
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
    if (this.resetForm.valid) {
      const password = this.pass.value;
      const id = '1234';
      this.reset.savePassword(password, id).subscribe(
        (res) => {
          console.log('Password updated successfully:', res);
          this.route.navigate(['/LogIn']);
        },
        (error) => {
          console.error('Error updating password:', error);
        }
      );
    }
  }
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