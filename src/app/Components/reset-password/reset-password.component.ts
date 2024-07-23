import { Component, OnInit, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import Swal from 'sweetalert2';
import { ResetPasswordService } from '@app/Services/reset-password.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgClass } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css'],
    standalone: true,
    imports: [
        NgxSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgIf,
        MatButtonModule,
        MatIconModule,
        NgClass,
        TranslateModule,
    ],
})
export class ResetPasswordComponent implements OnInit {
  constructor(private spinner:NgxSpinnerService,private route: Router, private userService: UserService, private dialog: MatDialog, private resetPasswordService: ResetPasswordService) { }

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
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  clickEventAuth(event: MouseEvent) {
    this.hideAuth.set(!this.hideAuth());
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
      const email = this.resetPasswordService.getUserEmail()
      this.spinner.show()
      this.userService.savePassword(email!, password).subscribe(
        (res) => {
          if (res === true) {
            this.spinner.hide()
            Swal.fire({
              title: "סיסמתך עודכנה בהצלחה",
              text: "הנך מועבר להתחברות מחדש",
              icon: "success",
              showCancelButton: false,
              showCloseButton: true,
              confirmButtonColor: "#3085D6",
              confirmButtonText: "Close"
            })
            this.route.navigate(['/login']);
          }
        },
        (error) => {
          Swal.fire({
            text: "התרחשה שגיאה בעת עדכון הסיסמה",
            icon: "error",
            showCancelButton: false,
            showCloseButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "סגור"
          })
          this.spinner.hide()
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

  isMatched(password: AbstractControl) {
    if (!password.value) return { req: true };
    if (password.value != this.pass.value) return { notValid: true };
    return null;
  }
}
