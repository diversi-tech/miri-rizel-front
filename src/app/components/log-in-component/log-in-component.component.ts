import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app.services';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Model/User';

@Component({
  selector: 'app-log-in-component',
  templateUrl: './log-in-component.component.html',
  styleUrls: ['./log-in-component.component.css']
})
export class LogInComponentComponent {

  constructor(private users: AppService, private router: Router, private active: ActivatedRoute) {
  }

  userLogIn: any = { username: null, password: null, role: null }

  userRole: User = {
    firstName: "",
    lastName: "",
    password: "",
    password2: "",
    email: "",
    role: ""
  };

  toEnter() {
    if (this.userLogIn.username == null || this.userLogIn.password == null || this.userLogIn.role == null) {
      alert('miss detail to log in');
    } else {
      this.users.getByPassword(this.userLogIn.password).subscribe((user: User) => {
        this.userRole = user;
        if (this.userRole.role != this.userLogIn.role) {
          alert("לא הכנסתה את התפקיד הנכון לגביך");
        } else {
          this.users.login(this.userLogIn.username, this.userLogIn.password).subscribe(() => {
            if (this.userRole.role == "admin") {
              this.router.navigate(['Admin'], { relativeTo: this.active });
            }
            if (this.userRole.role == "worker") {
              this.router.navigate(['worker'], { relativeTo: this.active });
            }
            if (this.userRole.role == "customer") {
              this.router.navigate(['customer'], { relativeTo: this.active });
            }
          });
        }
      });
    }
  }

}
