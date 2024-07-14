
import { Component, OnInit, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Model/User';
import { ResetPasswordService } from '../../Services/reset-password.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { UserService } from 'src/app/Services/user.service';
<<<<<<< HEAD
import { GoogleComponent } from '../google/google.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
=======
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
>>>>>>> 76c1a05487c8920dbfdbbfe6cb73fc6273a83e43
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgIf,
        MatButtonModule,
        MatIconModule,
        GoogleComponent,
    ],
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
    private active: ActivatedRoute,
    private translate:TranslateService
  ) { }

  hide = signal(true);

  isLoading: boolean = false

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  logInForm: FormGroup = new FormGroup({});
  get email() { return this.logInForm.controls['email'] }
  get pass() { return this.logInForm.controls['password'] }
  userData: String="logIn"

  onSubmit() {
    if (this.logInForm.invalid) {
      return;
    }
    const email = this.email.value;
    const password = this.pass.value;
    this.userService.login(email, password).subscribe(
      (user: User) => {
        this.router.navigate(['/home', user.role])
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
          // error => {
          //   this.dialog.open(DialogComponent, {
          //     data: {
          //       title: 'שגיאה',
          //       context: 'ארעה תקלה במהלך ההתחברות, נסה שנית',
          //       buttonText: 'סגור',
          //     },
          //   })};
      }
    );
  }
  resetPassword() {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.value)) {
      this.isLoading = true
      this.resetPasswordService.setUserEmail(this.email.value)
      this.resetPasswordService.resetPassword(this.email.value).subscribe(
        (response) => {
          this.router.navigate(['/ResetPassword']);
          this.resetPasswordService.setServerPassword(response);
        },
        (err) => {
          this.isLoading = false
            if (err.status == 400) {
              this.translate.get(['Close', 'EmailNotFound']).subscribe(translations => {
                Swal.fire({
                  text: translations['EmailNotFound'],
                  icon: "error",
                  showCancelButton: false,
                  showCloseButton: true,
                  confirmButtonColor: "#d33",
                  confirmButtonText: translations['Close']
                })
              })
            } else {
              this.translate.get(['Close', 'ProblemSendingEmail']).subscribe(translations => {
                Swal.fire({
                  text: translations['ProblemSendingEmail'],
                  icon: "error",
                  showCancelButton: false,
                  showCloseButton: true,
                  confirmButtonColor: "#d33",
                  confirmButtonText: translations['Close']
                }).then((res) => {
                  this.isLoading = false
                });
              })
            }
          }
      );
    } else {
      this.isLoading = false;
      this.translate.get(['Close', 'InvalidEmail']).subscribe(translations => {
        Swal.fire({
          text: translations['InvalidEmail'],
          icon: "error",
          showCancelButton: false,
          showCloseButton: true,
          confirmButtonColor: "#d33",
          confirmButtonText: translations['Close']
        })
      })
    }
  }
  
  signUp() {
    this.router.navigate(['../signUp']);
  }
}
