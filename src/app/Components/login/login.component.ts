import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Model/User';
import { ResetPasswordService } from '@app/Services/reset-password.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@app/Components/dialog/dialog.component';
import { UserService } from 'src/app/Services/user.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { GoogleComponent } from '@app/Components/google/google.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Location, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner";
import { KeyboardService } from 'src/app/Services/keyboard.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
    MatProgressSpinnerModule,
    GoogleComponent,
    TranslateModule,
  ],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    this.logInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  constructor(
    private spinner: NgxSpinnerService,
    private resetPasswordService: ResetPasswordService,
    private router: Router,
    private userService: UserService,
    private active: ActivatedRoute,
    private translate: TranslateService,
    private fb: FormBuilder,
    private Keyboardservice: KeyboardService
  ) {
    this.logInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  logInForm: FormGroup = new FormGroup({});
  get email() {
    return this.logInForm.controls['email'];
  }
  get pass() {
    return this.logInForm.controls['password'];
  }
  userData: String = 'logIn';

  passwordCheck: boolean = false;
  onSubmit() {
    if (this.logInForm.invalid) {
      return;
    }
    this.spinner.show()
    const email = this.email.value;
    const password = this.pass.value;
    this.userService.login(email, password).subscribe(
      (user: any) => {
        this.spinner.hide();
        // if (user.user.role.id == 1) {
        //   this.router.navigate(['/Dashboard'], { relativeTo: this.active });
        //   console.log(user.user.role,"user.role");             
        // }
        // else{
        //   this.router.navigate(['/home'], { relativeTo: this.active });
        // }
        this.router.navigate(['/redirect']).then(() => {
          // רענן את העמוד לאחר ניווט מוצלח
          setTimeout(() => {
            window.location.reload();
          }, 100); // ה-delay תלוי בצורך שלך
        });

      },
      (error) => {
        if (error.status == 404) {
          this.spinner.hide()
          this.translate.get(['EmailNotFound', 'Close']).subscribe(translation =>
            Swal.fire({
              text: translation['EmailNotFound'],
              icon: 'error',
              showCancelButton: false,
              showCloseButton: true,
              confirmButtonColor: '#d33',
              confirmButtonText: translation['Close'],
            }).then((res) => {
              this.spinner.hide()
            }))
        } else if (error.status == 400) {
          this.passwordCheck = true;
          this.spinner.hide()
          // Swal.fire({
          //   text: 'error password',
          //   icon: 'error',
          //   showCancelButton: false,
          //   showCloseButton: true,
          //   confirmButtonColor: '#d33',
          //   confirmButtonText: 'Close',
          // }).then((res) => {
          //   this.spinner.hide()
          // });
        }
        else {
          this.spinner.hide()
          this.translate.get(['Close', 'error']).subscribe(translation =>
            Swal.fire({
              text: translation,
              icon: 'error',
              showCancelButton: false,
              showCloseButton: true,
              confirmButtonColor: '#d33',
              confirmButtonText: translation['Close'],
            }))
        }
      }

    )
    this.spinner.hide();
  }
  resetPassword() {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.value)) {
      this.spinner.show()
      this.resetPasswordService.setUserEmail(this.email.value)
      this.resetPasswordService.resetPassword(this.email.value).subscribe(
        (response) => {
          this.router.navigate(['/ResetPassword']);
          this.resetPasswordService.setServerPassword(response);
          this.spinner.hide()
        },
        (err) => {
          this.spinner.hide()
          if (err.status == 400) {
            this.translate
              .get(['Close', 'EmailNotFound'])
              .subscribe((translations) => {
                Swal.fire({
                  text: translations['EmailNotFound'],
                  icon: 'error',
                  showCancelButton: false,
                  showCloseButton: true,
                  confirmButtonColor: '#d33',
                  confirmButtonText: translations['Close'],
                });
              });
          } else {
            this.translate
              .get(['Close', 'ProblemSendingEmail'])
              .subscribe((translations) => {
                Swal.fire({
                  text: translations['ProblemSendingEmail'],
                  icon: 'error',
                  showCancelButton: false,
                  showCloseButton: true,
                  confirmButtonColor: '#d33',
                  confirmButtonText: translations['Close'],
                }).then((res) => {
                  this.spinner.hide()
                });
              });
          }
        }
      );
    } else {
      this.spinner.hide()
      this.translate.get(['Close', 'InvalidEmail']).subscribe(translations => {
        Swal.fire({
          text: translations['InvalidEmail'],
          icon: 'error',
          showCancelButton: false,
          showCloseButton: true,
          confirmButtonColor: '#d33',
          confirmButtonText: translations['Close'],
        });
      });
    }
  }

  signUp() {
    this.router.navigate(['../signUp']);
  }

  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;


  ngAfterViewInit() {
    this.emailInput.nativeElement.addEventListener('focus', () => {
      this.Keyboardservice.setActiveInput(this.emailInput.nativeElement, this.logInForm.get('email') as FormControl);
    });

    this.passwordInput.nativeElement.addEventListener('focus', () => {
      this.Keyboardservice.setActiveInput(this.passwordInput.nativeElement, this.logInForm.get('password') as FormControl);
    });
  }

}
