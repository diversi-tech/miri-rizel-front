import { Component, Injectable, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '@app/Model/User';
declare global {
  interface Window {
    google: any;
  }
}
import { UserService } from '@app/Services/user.service';
import { DialogComponent } from 'src/app/Components/dialog/dialog.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EmailService } from '@app/Services/sendEmailSignUp';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css'],
  standalone: true,
  imports: [TranslateModule]
})

@Injectable()
export class GoogleComponent {

  constructor(private emailService: EmailService,private dialog: MatDialog,
    private router: Router, private login: UserService,  private translate: TranslateService,) { }

  initGoogleOneTap(): void {
    if (window.google.accounts.id) {
      window.google.accounts.id.initialize({
        client_id: '412263291390-jkirnvmjnk6qbera6qcdq3k6cotqk9o7.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this)
      });
      window.google.accounts.id.prompt();
    } else {
        this.translate.get(['Close', 'Google accounts.id API not loadedr']).subscribe(translations => {
          Swal.fire({
            text: translations[ 'Google accounts.id API not loadedr'],
            icon: "error",
            showCancelButton: false,
            showCloseButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: translations['Close']
          })
        })
      
    }
  }

  @Input() userData!: String;

  addUser: User = { firstName: "", lastName: "", email: "", password: "", role: {id:0, description:""} };
  handleCredentialResponse(response: any): void {
    if (response.credential) {
      var idToken = response.credential;
      var decodedToken = this.parseJwt(idToken);
      var email = decodedToken.email;
      var userName = decodedToken.name;
      this.login.getByMail(email).subscribe(res => {
        if (this.userData == "logIn" && res != null) {
          this.login.loginGoogle(email, userName).subscribe(
            (response: any) => {
              const user = response.user;
              if (user.role == 1) {
                this.router.navigate(['/admin']);
              }
              if (user.role == 2) {
                this.router.navigate(['/worker']);
              }
              if (user.role == 3) {
                this.router.navigate(['/customer']);
              }
            },
            error => {
              this.dialog.open(DialogComponent, {
                data: {
                  title: 'שגיאה',
                  context: 'ארעה תקלה במהלך ההתחברות, נסה שנית',
                  buttonText: 'סגור',
                },
              });
            }
          );
        }
        if (this.userData == "logIn" && res == null) {
          this.dialog.open(DialogComponent, {
            data: {
              title: 'שגיאה',
              context: 'המייל לא קיים במערכת עבור ל-SIGNUP',
              buttonText: 'סגור',
            },
          });
        }
        if (this.userData == "signUp" && res == null) {
          this.addUser.email = email;
          this.addUser.firstName = userName;
          this.addUser.role = {id: 1, description: "Customer"};
          this.login.addUser(this.addUser).subscribe(() => {
            this.dialog.open(DialogComponent, {
              data: {
                title: 'הצלחה',
                context: 'נרשמתה במערכת בהצלחה',
                buttonText: 'סגור',
              },
            });
            this.emailService.sendEmailSignUp(this.addUser).subscribe(
              () => {
                this.router.navigate(['../worker']);
              },
            )
          }
          );
        }
        if (this.userData == "signUp" && res != null) {
          this.dialog.open(DialogComponent, {
            data: {
              title: 'שגיאה',
              context: 'המייל קיים במערכת עבור ל-LOGIN',
              buttonText: 'סגור',
            },
          });
        }
      },
        error => {
          this.dialog.open(DialogComponent, {
            data: {
              title: 'שגיאה',
              context: 'המייל לא קיים במערכת עבור ל-SIGNUP',
              buttonText: 'סגור',
            },
          });
        })
    }
  }

  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

}